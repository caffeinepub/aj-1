import { Language } from '../backend';

const UNSAFE_KEYWORDS = [
  'hack', 'crack', 'exploit', 'bomb', 'weapon', 'drug', 'illegal',
  'steal', 'fraud', 'scam', 'malware', 'virus', 'ddos', 'phishing',
];

export function isSafePrompt(prompt: string): boolean {
  const lowerPrompt = prompt.toLowerCase();
  return !UNSAFE_KEYWORDS.some(keyword => lowerPrompt.includes(keyword));
}

export function generateSafetyRefusal(language: Language): string {
  const refusals: Record<Language, string> = {
    [Language.en_US]: "I cannot provide assistance with that request as it may involve harmful, illegal, or unsafe activities. Instead, I'd be happy to help you with:\n\n1. Learning about cybersecurity best practices\n2. Understanding legal and ethical technology use\n3. Exploring safe and constructive alternatives\n\nHow can I assist you with a safe and legal topic?",
    [Language.de_DE]: "Ich kann bei dieser Anfrage nicht helfen, da sie schädliche, illegale oder unsichere Aktivitäten beinhalten könnte. Stattdessen helfe ich Ihnen gerne bei:\n\n1. Best Practices für Cybersicherheit\n2. Verständnis für legale und ethische Technologienutzung\n3. Erkundung sicherer und konstruktiver Alternativen\n\nWie kann ich Ihnen bei einem sicheren und legalen Thema helfen?",
    [Language.es_ES]: "No puedo ayudar con esa solicitud ya que puede involucrar actividades dañinas, ilegales o inseguras. En su lugar, estaré encantado de ayudarte con:\n\n1. Mejores prácticas de ciberseguridad\n2. Comprensión del uso legal y ético de la tecnología\n3. Exploración de alternativas seguras y constructivas\n\n¿Cómo puedo ayudarte con un tema seguro y legal?",
    [Language.fr_FR]: "Je ne peux pas vous aider avec cette demande car elle peut impliquer des activités nuisibles, illégales ou dangereuses. À la place, je serais heureux de vous aider avec:\n\n1. Les meilleures pratiques en cybersécurité\n2. La compréhension de l'utilisation légale et éthique de la technologie\n3. L'exploration d'alternatives sûres et constructives\n\nComment puis-je vous aider avec un sujet sûr et légal?",
    [Language.pt_PT]: "Não posso ajudar com essa solicitação, pois pode envolver atividades prejudiciais, ilegais ou inseguras. Em vez disso, ficarei feliz em ajudá-lo com:\n\n1. Melhores práticas de segurança cibernética\n2. Compreensão do uso legal e ético da tecnologia\n3. Exploração de alternativas seguras e construtivas\n\nComo posso ajudá-lo com um tópico seguro e legal?",
    [Language.it_IT]: "Non posso fornire assistenza per quella richiesta in quanto potrebbe coinvolgere attività dannose, illegali o non sicure. Invece, sarò felice di aiutarti con:\n\n1. Migliori pratiche di sicurezza informatica\n2. Comprensione dell'uso legale ed etico della tecnologia\n3. Esplorazione di alternative sicure e costruttive\n\nCome posso aiutarti con un argomento sicuro e legale?",
    [Language.ru_RU]: "Я не могу помочь с этим запросом, так как он может включать вредные, незаконные или небезопасные действия. Вместо этого я буду рад помочь вам с:\n\n1. Лучшими практиками кибербезопасности\n2. Пониманием законного и этичного использования технологий\n3. Изучением безопасных и конструктивных альтернатив\n\nКак я могу помочь вам с безопасной и законной темой?",
    [Language.ja_JP]: "その要求は有害、違法、または安全でない活動を含む可能性があるため、支援できません。代わりに、以下のことでお手伝いできます：\n\n1. サイバーセキュリティのベストプラクティスについて学ぶ\n2. 合法的で倫理的な技術の使用を理解する\n3. 安全で建設的な代替案を探る\n\n安全で合法的なトピックでどのようにお手伝いできますか？",
    [Language.zh_CN]: "我无法协助该请求，因为它可能涉及有害、非法或不安全的活动。相反，我很乐意帮助您：\n\n1. 学习网络安全最佳实践\n2. 了解合法和道德的技术使用\n3. 探索安全和建设性的替代方案\n\n我如何帮助您处理安全合法的话题？",
    [Language.ko_KR]: "해당 요청은 유해하거나 불법적이거나 안전하지 않은 활동을 포함할 수 있으므로 도움을 드릴 수 없습니다. 대신 다음과 같은 도움을 드릴 수 있습니다:\n\n1. 사이버 보안 모범 사례 학습\n2. 합법적이고 윤리적인 기술 사용 이해\n3. 안전하고 건설적인 대안 탐색\n\n안전하고 합법적인 주제로 어떻게 도와드릴까요?",
    [Language.tr_TR]: "Bu istek zararlı, yasadışı veya güvenli olmayan faaliyetler içerebileceğinden yardımcı olamam. Bunun yerine size şunlarda yardımcı olmaktan mutluluk duyarım:\n\n1. Siber güvenlik en iyi uygulamalarını öğrenmek\n2. Yasal ve etik teknoloji kullanımını anlamak\n3. Güvenli ve yapıcı alternatifleri keşfetmek\n\nGüvenli ve yasal bir konuda size nasıl yardımcı olabilirim?",
    [Language.ar_SA]: "لا يمكنني تقديم المساعدة في هذا الطلب لأنه قد يتضمن أنشطة ضارة أو غير قانونية أو غير آمنة. بدلاً من ذلك، سأكون سعيدًا بمساعدتك في:\n\n1. التعرف على أفضل ممارسات الأمن السيبراني\n2. فهم الاستخدام القانوني والأخلاقي للتكنولوجيا\n3. استكشاف البدائل الآمنة والبناءة\n\nكيف يمكنني مساعدتك في موضوع آمن وقانوني؟",
    [Language.hi_IN]: "मैं उस अनुरोध में सहायता प्रदान नहीं कर सकता क्योंकि इसमें हानिकारक, अवैध या असुरक्षित गतिविधियाँ शामिल हो सकती हैं। इसके बजाय, मुझे आपकी मदद करने में खुशी होगी:\n\n1. साइबर सुरक्षा सर्वोत्तम प्रथाओं के बारे में सीखना\n2. कानूनी और नैतिक प्रौद्योगिकी उपयोग को समझना\n3. सुरक्षित और रचनात्मक विकल्पों की खोज करना\n\nमैं एक सुरक्षित और कानूनी विषय के साथ आपकी कैसे सहायता कर सकता हूं?",
  };

  return refusals[language] || refusals[Language.en_US];
}
