// pages/api/search.js

export default async function handler(req, res) {
  try {
    // fetch from /api/data
    const data = [
      {
        id: 1,
        title: "Atlas",
        video:
          "https://video.godly.website/video/upload/w_1280/q_70/godly/recordings/tahdqadtfichtz4hwidt.mp4",
        description:
          "Atlas is a data labeling platform that provides the best solution for computer vision teams who want to iterate faster and scale globally.",
        link: "https://atlas.dsop.io/",
        tags: ["data", "ai", "computer vision"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
      {
        id: 2,
        title: "Scale AI",
        image:
          "https://uploads-ssl.webflow.com/63bea64d5a430503eed2e6cc/64ec6e65addeee5e0e3faef2_Scale%20AI%20Cover.png",
        description:
          "Scale AI is the data platform for AI. Scale AI’s API for human-powered data annotation and synthetic data generation is used by Alphabet, Zoox, Lyft, Pinterest, Airbnb, nuTonomy, and many more leading AI companies.",
        link: "https://scale.com/",
        tags: ["data", "ai", "computer vision"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
      {
        id: 3,
        title: "Family",
        description:
          "An inspirational web3 mobile app website built with react, using inter as their primary font.",
        image: "",
        video:
          "https://video.godly.website/video/upload/w_720/q_70/godly/recordings/ehfwkubzzv8fpsmh4uzx.mp4",
        link: "https://godly.website/website/974-family",
        tags: ["web3", "react", "inter"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
      {
        id: 4,
        title: "Phantom",
        description:
          "An inspirational cryptocurrency mobile app website built with emotion, using phantom as their primary font.",
        video:
          "https://video.godly.website/video/upload/w_720/q_70/godly/recordings/xi9ghp5bygni2u8vikzo.webm",
        link: "https://godly.website/website/973-phantom",
        tags: ["crypto", "emotion", "phantom"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
      {
        id: 5,
        title: "Wise Design",
        description:
          "An inspirational business & finance animation website built with react, using inter as their primary font.",
        video:
          "https://video.godly.website/video/upload/w_720/q_70/godly/recordings/rwgc9wy8puhhgnhp3l8n.webm",
        link: "https://godly.website/website/973-phantom",
        tags: ["business", "finance", "react", "inter"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
      {
        id: 6,
        title: "Chenzoku",
        description:
          "An inspirational nft animation website built with gsap, using druk as their primary font.",
        video:
          "https://video.godly.website/video/upload/w_2560/q_100/godly/recordings/pyaqvjjimo6vixa0mdab.webm",
        link: "https://chainzoku.io/?ref=godly",
        tags: ["nft", "gsap", "druk"],
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        date: "2021-10-01T00:00:00.000Z",
      },
    ];

    // Extract the search term from the query parameter
    const { q } = req.query;

    // Perform your search logic here, e.g., fetch data from a database
    // Replace this with your actual search logic
    const searchResults = data.filter((result) =>
      result.title.toLowerCase().includes(q.toLowerCase())
    );

    // Return the search results as JSON
    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while searching." });
  }
}
