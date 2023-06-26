import type { NextApiRequest, NextApiResponse } from 'next';
import { makeChain } from '@/utils/makechain';

var clients = new Map();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, randomId } = req.body;
  console.log(randomId);
  console.log('question', question);
  
  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  if (clients.get(randomId) == undefined) {
    const chain = makeChain();
    clients.set(randomId, chain);
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    const chain = clients.get(randomId);
    //Ask a question using chat history
    const response = await chain.call({
      input: sanitizedQuestion,
    });

    console.log('response', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
