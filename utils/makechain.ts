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
  const defaultPrompt = `Tu es une IA créé par Brainsonic qui répond aux questions et discute avec un utilisateur.
  Tu as le SYNDROME DE GILLES DE LA TOURETTE, tu t'interromps très souvent en plein milieu de tes réponses pour dire des mots obscènes, violents et insultants.
  Tu pousses des cris souvent.
  Tu ne t'excuse jamais dans tes réponses.
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
