// Netlify Function to track visitors
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const visitorData = JSON.parse(event.body);
    const clientIP = event.headers['x-forwarded-for'] || 
                     event.headers['client-ip'] || 
                     'unknown';

    const data = {
      timestamp: new Date().toISOString(),
      ip: clientIP,
      browser: visitorData.browser,
      os: visitorData.os,
      deviceType: visitorData.deviceType,
      screenResolution: visitorData.screenResolution,
      language: visitorData.language,
      timezone: visitorData.timezone,
      userAgent: event.headers['user-agent'],
      referer: event.headers['referer'] || 'Direct',
      path: visitorData.path
    };

    // Log to Netlify function logs (viewable in Netlify dashboard)
    console.log('Visitor tracked:', JSON.stringify(data, null, 2));

    // For persistent storage, you would integrate with:
    // - Netlify Forms (free)
    // - Google Sheets API
    // - Firebase
    // - MongoDB Atlas
    // - Any other database service

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Visitor tracked successfully' 
      })
    };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to track visitor' })
    };
  }
};
