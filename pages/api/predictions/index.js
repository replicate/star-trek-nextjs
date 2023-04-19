const API_HOST = process.env.REPLICATE_API_HOST || "https://api.replicate.com";

import packageData from "../../../package.json";

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.");
  }

  const body = JSON.stringify({
    version: "bb5c6d426fabd3736faf7243ea70d2cdbc0f8131b22953386759a9b4d2858aad",
    input: {
      max_length: 750,
      decoding: "top_p",
      temperature: 0.75,
      top_p: 1,
      repetition_penalty: 1.2,
      prompt: req.body,
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
