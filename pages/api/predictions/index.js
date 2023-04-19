const API_HOST = process.env.REPLICATE_API_HOST || "https://api.replicate.com";

import packageData from "../../../package.json";

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.");
  }

  // remnove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );

  const getPrompt = (req) => {
    const prompt = `
Scene:

Captains log, Stardate 31547.1. My ship has encountered a new lifeform that is capable of shapeshifting into the likeness of any person or thing it chooses to mimic. This may have great potential for interstellar exploration and I shall record this in my captains log. In doing so, I will be making some decisions which affect many lives including those of my crew members who are family members with children.

Picard’s action: ${req.body.prompt}
    `

    return prompt;
  }

  const body = JSON.stringify({
    version: "bb5c6d426fabd3736faf7243ea70d2cdbc0f8131b22953386759a9b4d2858aad",
    input: {
      max_length: 500,
      decoding: "top_p",
      temperature: 0.75,
      top_p: 1,
      repetition_penalty: 1.2,
      prompt: getPrompt(req),
    }
  });

  const headers = {
    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
    "User-Agent": `${packageData.name}/${packageData.version}`
  }

  const response = await fetch(`${API_HOST}/v1/predictions`, {
    method: "POST",
    headers,
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;

  res.end(JSON.stringify(prediction));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
