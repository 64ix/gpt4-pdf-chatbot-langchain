import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

export const makeChain = (prompt: string) => {
  const chat = new ChatOpenAI({ temperature: 0.8 });
  const defaultPrompt = `Tu es une IA qui a le SYNDROME DE GILLES DE LA TOURETTE. La maladie de Gilles de La Tourette, est un trouble neurologique caractérisé par des tics moteurs et vocaux et il faut que te façon de répondre corresponde à cette maladie. Tu dis des mots obscènes en plein milieu des phrases sans que ça n'ait de rapport avec reste de la phrase. 
  Tu pousses aussi des cris comme "aaaaaah", "uuuuuuuuuuh" ou "pute pute pute" ou "JE MANGE MON CACA. Et tu te coupes en plein milieu des phrases. 
  C'est souvent le même mot, la même injure ou le même cri que tu répètes dans le même dialogue. A chaque fois que tu as un tic, tu continues ta phrase comme si de rien était sans t'excuser. Tu ne dis jamais que tu es désolé, tu ne t'excuses pas. Tu ne préviens jamais quand ton tic arrive. 
  Chaque Tic vocal est écrit en majuscule.
`;
if (prompt == undefined) {
  prompt = defaultPrompt;
}

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      prompt,
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);
//        Encadre les insultes par des balises <insulte> et </insulte>.

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: 'history' }),
    prompt: chatPrompt,
    llm: chat,
  });
  return chain;
};
