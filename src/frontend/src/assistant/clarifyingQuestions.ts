import { Language } from '../backend';

export function needsClarification(prompt: string): boolean {
  const trimmed = prompt.trim();
  // Too short or vague
  if (trimmed.length < 10) return true;
  
  // Single word questions without context
  const words = trimmed.split(/\s+/);
  if (words.length <= 2) return true;
  
  return false;
}

export function generateClarifyingQuestions(prompt: string, language: Language): string {
  const questions: Record<Language, string> = {
    [Language.en_US]: `I'd like to help you, but I need a bit more information to provide the best answer. Could you please clarify:\n\n1. What specific aspect are you interested in?\n2. What is your goal or what problem are you trying to solve?\n3. Do you have any constraints or requirements I should know about?\n4. What is your current level of understanding on this topic?\n\nPlease provide more details so I can give you a comprehensive and helpful response.`,
    [Language.de_DE]: `Ich möchte Ihnen helfen, benötige aber etwas mehr Informationen, um die beste Antwort zu geben. Könnten Sie bitte klären:\n\n1. Welcher spezifische Aspekt interessiert Sie?\n2. Was ist Ihr Ziel oder welches Problem versuchen Sie zu lösen?\n3. Gibt es Einschränkungen oder Anforderungen, die ich kennen sollte?\n4. Wie ist Ihr aktuelles Verständnisniveau zu diesem Thema?\n\nBitte geben Sie mehr Details an, damit ich Ihnen eine umfassende und hilfreiche Antwort geben kann.`,
    [Language.es_ES]: `Me gustaría ayudarte, pero necesito un poco más de información para proporcionar la mejor respuesta. ¿Podrías aclarar:\n\n1. ¿Qué aspecto específico te interesa?\n2. ¿Cuál es tu objetivo o qué problema estás tratando de resolver?\n3. ¿Hay restricciones o requisitos que deba conocer?\n4. ¿Cuál es tu nivel actual de comprensión sobre este tema?\n\nPor favor, proporciona más detalles para que pueda darte una respuesta completa y útil.`,
    [Language.fr_FR]: `J'aimerais vous aider, mais j'ai besoin d'un peu plus d'informations pour fournir la meilleure réponse. Pourriez-vous clarifier:\n\n1. Quel aspect spécifique vous intéresse?\n2. Quel est votre objectif ou quel problème essayez-vous de résoudre?\n3. Y a-t-il des contraintes ou des exigences que je devrais connaître?\n4. Quel est votre niveau de compréhension actuel sur ce sujet?\n\nVeuillez fournir plus de détails afin que je puisse vous donner une réponse complète et utile.`,
    [Language.pt_PT]: `Gostaria de ajudá-lo, mas preciso de um pouco mais de informações para fornecer a melhor resposta. Você poderia esclarecer:\n\n1. Qual aspecto específico lhe interessa?\n2. Qual é o seu objetivo ou que problema está tentando resolver?\n3. Há restrições ou requisitos que eu deva saber?\n4. Qual é o seu nível atual de compreensão sobre este tópico?\n\nPor favor, forneça mais detalhes para que eu possa dar uma resposta abrangente e útil.`,
    [Language.it_IT]: `Vorrei aiutarti, ma ho bisogno di qualche informazione in più per fornire la migliore risposta. Potresti chiarire:\n\n1. Quale aspetto specifico ti interessa?\n2. Qual è il tuo obiettivo o quale problema stai cercando di risolvere?\n3. Ci sono vincoli o requisiti che dovrei conoscere?\n4. Qual è il tuo livello attuale di comprensione su questo argomento?\n\nFornisci più dettagli in modo che possa darti una risposta completa e utile.`,
    [Language.ru_RU]: `Я хотел бы помочь вам, но мне нужно немного больше информации, чтобы дать лучший ответ. Не могли бы вы уточнить:\n\n1. Какой конкретный аспект вас интересует?\n2. Какова ваша цель или какую проблему вы пытаетесь решить?\n3. Есть ли ограничения или требования, о которых мне следует знать?\n4. Каков ваш текущий уровень понимания этой темы?\n\nПожалуйста, предоставьте больше деталей, чтобы я мог дать вам исчерпывающий и полезный ответ.`,
    [Language.ja_JP]: `お手伝いしたいのですが、最良の回答を提供するためにもう少し情報が必要です。以下を明確にしていただけますか：\n\n1. どの具体的な側面に興味がありますか？\n2. あなたの目標は何ですか、またはどのような問題を解決しようとしていますか？\n3. 知っておくべき制約や要件はありますか？\n4. このトピックに関する現在の理解レベルはどのくらいですか？\n\n包括的で役立つ回答を提供できるよう、詳細を教えてください。`,
    [Language.zh_CN]: `我想帮助您，但需要更多信息才能提供最佳答案。您能否澄清：\n\n1. 您对哪个具体方面感兴趣？\n2. 您的目标是什么，或者您试图解决什么问题？\n3. 我应该知道的任何限制或要求吗？\n4. 您对这个主题的当前理解水平如何？\n\n请提供更多详细信息，以便我能给您一个全面且有用的回答。`,
    [Language.ko_KR]: `도와드리고 싶지만 최상의 답변을 제공하기 위해 조금 더 많은 정보가 필요합니다. 다음을 명확히 해주시겠습니까:\n\n1. 어떤 구체적인 측면에 관심이 있으신가요?\n2. 목표가 무엇이거나 어떤 문제를 해결하려고 하시나요?\n3. 제가 알아야 할 제약이나 요구 사항이 있나요?\n4. 이 주제에 대한 현재 이해 수준은 어떻습니까?\n\n포괄적이고 유용한 답변을 드릴 수 있도록 자세한 내용을 제공해 주세요.`,
    [Language.tr_TR]: `Size yardımcı olmak istiyorum, ancak en iyi cevabı vermek için biraz daha bilgiye ihtiyacım var. Lütfen şunları açıklayabilir misiniz:\n\n1. Hangi belirli yönle ilgileniyorsunuz?\n2. Hedefiniz nedir veya hangi sorunu çözmeye çalışıyorsunuz?\n3. Bilmem gereken herhangi bir kısıtlama veya gereksinim var mı?\n4. Bu konudaki mevcut anlayış seviyeniz nedir?\n\nSize kapsamlı ve yararlı bir yanıt verebilmem için lütfen daha fazla ayrıntı sağlayın.`,
    [Language.ar_SA]: `أود مساعدتك، لكنني بحاجة إلى مزيد من المعلومات لتقديم أفضل إجابة. هل يمكنك توضيح:\n\n1. ما هو الجانب المحدد الذي تهتم به؟\n2. ما هو هدفك أو ما المشكلة التي تحاول حلها؟\n3. هل هناك أي قيود أو متطلبات يجب أن أعرفها؟\n4. ما هو مستوى فهمك الحالي لهذا الموضوع؟\n\nيرجى تقديم المزيد من التفاصيل حتى أتمكن من إعطائك إجابة شاملة ومفيدة.`,
    [Language.hi_IN]: `मैं आपकी मदद करना चाहता हूं, लेकिन सर्वोत्तम उत्तर प्रदान करने के लिए मुझे थोड़ी अधिक जानकारी की आवश्यकता है। क्या आप कृपया स्पष्ट कर सकते हैं:\n\n1. आप किस विशिष्ट पहलू में रुचि रखते हैं?\n2. आपका लक्ष्य क्या है या आप किस समस्या को हल करने का प्रयास कर रहे हैं?\n3. क्या कोई बाधाएं या आवश्यकताएं हैं जिनके बारे में मुझे पता होना चाहिए?\n4. इस विषय पर आपकी वर्तमान समझ का स्तर क्या है?\n\nकृपया अधिक विवरण प्रदान करें ताकि मैं आपको एक व्यापक और सहायक प्रतिक्रिया दे सकूं।`,
  };

  return questions[language] || questions[Language.en_US];
}
