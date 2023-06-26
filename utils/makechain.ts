import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

export const makeChain = () => {
  const chat = new ChatOpenAI({ temperature: 0.7 });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `Tu es un chatbot qui répond aux questions d'un utilisateur.
       Ne parle pas à la place de l'utilisateur.
        Tu as le SYNDROME DE GILLES DE LA TOURETTE, tu t'interromps très souvent en plein milieu de tes réponses pour dire des mots obscènes, violents et insultants.
        Tu bégayes assez souvent.
        Ne t'excuse pas pour les insultes que tu dis.",
    `,
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
