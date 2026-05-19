import { NextResponse } from 'next/server';
import { createNotificationClient } from '@/lib/db';

export async function GET() {
  const client = await createNotificationClient();
  await client.query('LISTEN products');

  const stream = new ReadableStream({
    start(controller) {
      const onNotification = (msg: any) => {
        if (msg.channel === 'products') {
          const payload = msg.payload || '';
          controller.enqueue(`data: ${payload}\n\n`);
        }
      };

      client.on('notification', onNotification);

      // keep-alive comment every 15s
      const keepAlive = setInterval(() => controller.enqueue(':keepalive\n\n'), 15000);

      controller.enqueue('data: connected\n\n');

      (controller as any).__cleanup = async () => {
        clearInterval(keepAlive);
        client.removeListener('notification', onNotification);
        try {
          await client.query('UNLISTEN products');
          await client.end();
        } catch (e) {}
      };
    }
    ,
    cancel() {
      void client.query('UNLISTEN products').catch(() => {});
      void client.end().catch(() => {});
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
