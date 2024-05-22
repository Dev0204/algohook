const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

const supabase = createClient('https://iczwmwijzvtfmibycdyy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljendtd2lqenZ0Zm1pYnljZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MjkxNTksImV4cCI6MjAyOTUwNTE1OX0.HGtf2Wu3o4_I7hRzOTDSp0qGcP2NZJnAPSNU-2Lc4R4');

supabase
  .from('products')
  .on('*', payload => {
    fetch('https://webhook-peach.vercel.app/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: payload.eventType,
        table: payload.table,
        record: payload.new || payload.old,
      }),
    });
  })
  .subscribe();
