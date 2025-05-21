const pipedApi = Deno.args[0].toString()
const handler = async (request) => {
    
    if (!(request.method == 'GET' && '/'+request.url.split('/').slice(3).join('/') == '/')) {
        return new Response('404 Not Found', {
            status: 404,
            headers: {
                'Content-Type': 'text/plain'
            },
        })
    }
    const channelData = await fetch(`https://${pipedApi}/channel/UCDVKYPXwdYUQfgA05CkyFSg`)
    const channelDataJson = await channelData.json()
    const livestreamTabData = encodeURIComponent(channelDataJson.tabs.find(tab => tab.name === 'livestreams').data)
    const tabData = await fetch(`https://${pipedApi}/channels/tabs?data=${livestreamTabData}`)
    const streams = await tabData.json()
    const videoGameStudyLounge = streams.content.find(stream => stream.duration == -1 && stream.title.toLowerCase().includes('video game study lounge'))
    if (videoGameStudyLounge) {
        const videoGameStudyLoungeUrl = `https://www.youtube.com${videoGameStudyLounge.url}`
        return Response.redirect(videoGameStudyLoungeUrl, 302)
    } else return new Response('500 Internal Server Error', {
        status: 500,
        headers: {
            'Content-Type': 'text/plain'
        },
    })
}
await Deno.serve({ port: Deno.args[1] }, handler)