import { Language } from '../backend';

export type ExplanationLevel = 0 | 1 | 2; // 0: Beginner, 1: Student, 2: Expert

interface ResponseSection {
  title: string;
  content: string;
}

export interface StructuredResponse {
  sections: ResponseSection[];
}

const sectionTitles: Record<Language, { coreIssue: string; breakdown: string; solution: string; examples: string; summary: string }> = {
  [Language.en_US]: {
    coreIssue: '🎯 Core Issue',
    breakdown: '🔍 Breaking It Down',
    solution: '💡 Step-by-Step Solution',
    examples: '📚 Examples',
    summary: '✨ Summary & Next Steps',
  },
  [Language.de_DE]: {
    coreIssue: '🎯 Kernproblem',
    breakdown: '🔍 Aufschlüsselung',
    solution: '💡 Schritt-für-Schritt-Lösung',
    examples: '📚 Beispiele',
    summary: '✨ Zusammenfassung & Nächste Schritte',
  },
  [Language.es_ES]: {
    coreIssue: '🎯 Problema Central',
    breakdown: '🔍 Desglose',
    solution: '💡 Solución Paso a Paso',
    examples: '📚 Ejemplos',
    summary: '✨ Resumen y Próximos Pasos',
  },
  [Language.fr_FR]: {
    coreIssue: '🎯 Problème Principal',
    breakdown: '🔍 Décomposition',
    solution: '💡 Solution Étape par Étape',
    examples: '📚 Exemples',
    summary: '✨ Résumé et Prochaines Étapes',
  },
  [Language.pt_PT]: {
    coreIssue: '🎯 Problema Central',
    breakdown: '🔍 Detalhamento',
    solution: '💡 Solução Passo a Passo',
    examples: '📚 Exemplos',
    summary: '✨ Resumo e Próximos Passos',
  },
  [Language.it_IT]: {
    coreIssue: '🎯 Problema Centrale',
    breakdown: '🔍 Scomposizione',
    solution: '💡 Soluzione Passo dopo Passo',
    examples: '📚 Esempi',
    summary: '✨ Riepilogo e Prossimi Passi',
  },
  [Language.ru_RU]: {
    coreIssue: '🎯 Основная Проблема',
    breakdown: '🔍 Разбивка',
    solution: '💡 Пошаговое Решение',
    examples: '📚 Примеры',
    summary: '✨ Резюме и Следующие Шаги',
  },
  [Language.ja_JP]: {
    coreIssue: '🎯 核心的な問題',
    breakdown: '🔍 分解',
    solution: '💡 ステップバイステップの解決策',
    examples: '📚 例',
    summary: '✨ まとめと次のステップ',
  },
  [Language.zh_CN]: {
    coreIssue: '🎯 核心问题',
    breakdown: '🔍 分解',
    solution: '💡 逐步解决方案',
    examples: '📚 示例',
    summary: '✨ 总结与下一步',
  },
  [Language.ko_KR]: {
    coreIssue: '🎯 핵심 문제',
    breakdown: '🔍 세부 분석',
    solution: '💡 단계별 솔루션',
    examples: '📚 예제',
    summary: '✨ 요약 및 다음 단계',
  },
  [Language.tr_TR]: {
    coreIssue: '🎯 Ana Sorun',
    breakdown: '🔍 Ayrıntılı İnceleme',
    solution: '💡 Adım Adım Çözüm',
    examples: '📚 Örnekler',
    summary: '✨ Özet ve Sonraki Adımlar',
  },
  [Language.ar_SA]: {
    coreIssue: '🎯 المشكلة الأساسية',
    breakdown: '🔍 التفصيل',
    solution: '💡 الحل خطوة بخطوة',
    examples: '📚 أمثلة',
    summary: '✨ الملخص والخطوات التالية',
  },
  [Language.hi_IN]: {
    coreIssue: '🎯 मुख्य समस्या',
    breakdown: '🔍 विस्तृत विवरण',
    solution: '💡 चरण-दर-चरण समाधान',
    examples: '📚 उदाहरण',
    summary: '✨ सारांश और अगले कदम',
  },
};

export function generateStructuredResponse(
  prompt: string,
  language: Language,
  level: ExplanationLevel
): StructuredResponse {
  const titles = sectionTitles[language] || sectionTitles[Language.en_US];
  
  // This is a template-based response generator
  // In a real implementation with an LLM, this would call the model
  const sections: ResponseSection[] = [
    {
      title: titles.coreIssue,
      content: generateCoreIssue(prompt, language, level),
    },
    {
      title: titles.breakdown,
      content: generateBreakdown(prompt, language, level),
    },
    {
      title: titles.solution,
      content: generateSolution(prompt, language, level),
    },
    {
      title: titles.examples,
      content: generateExamples(prompt, language, level),
    },
    {
      title: titles.summary,
      content: generateSummary(prompt, language, level),
    },
  ];

  return { sections };
}

function generateCoreIssue(prompt: string, language: Language, level: ExplanationLevel): string {
  const templates: Record<Language, string[]> = {
    [Language.en_US]: [
      `You're asking about: **${prompt}**\n\nThis is a ${level === 0 ? 'fundamental' : level === 1 ? 'practical' : 'advanced'} topic that involves understanding key concepts and their relationships.`,
      `The core of your question relates to **${prompt}**. Let me help you understand this clearly.`,
    ],
    [Language.de_DE]: [
      `Sie fragen nach: **${prompt}**\n\nDies ist ein ${level === 0 ? 'grundlegendes' : level === 1 ? 'praktisches' : 'fortgeschrittenes'} Thema, das das Verständnis wichtiger Konzepte und ihrer Beziehungen erfordert.`,
    ],
    [Language.es_ES]: [
      `Estás preguntando sobre: **${prompt}**\n\nEste es un tema ${level === 0 ? 'fundamental' : level === 1 ? 'práctico' : 'avanzado'} que implica comprender conceptos clave y sus relaciones.`,
    ],
    [Language.fr_FR]: [
      `Vous demandez à propos de: **${prompt}**\n\nC'est un sujet ${level === 0 ? 'fondamental' : level === 1 ? 'pratique' : 'avancé'} qui implique la compréhension de concepts clés et de leurs relations.`,
    ],
    [Language.pt_PT]: [
      `Você está perguntando sobre: **${prompt}**\n\nEste é um tópico ${level === 0 ? 'fundamental' : level === 1 ? 'prático' : 'avançado'} que envolve a compreensão de conceitos-chave e suas relações.`,
    ],
    [Language.it_IT]: [
      `Stai chiedendo di: **${prompt}**\n\nQuesto è un argomento ${level === 0 ? 'fondamentale' : level === 1 ? 'pratico' : 'avanzato'} che implica la comprensione di concetti chiave e delle loro relazioni.`,
    ],
    [Language.ru_RU]: [
      `Вы спрашиваете о: **${prompt}**\n\nЭто ${level === 0 ? 'фундаментальная' : level === 1 ? 'практическая' : 'продвинутая'} тема, которая включает понимание ключевых концепций и их взаимосвязей.`,
    ],
    [Language.ja_JP]: [
      `あなたは次のことについて尋ねています：**${prompt}**\n\nこれは${level === 0 ? '基本的な' : level === 1 ? '実践的な' : '高度な'}トピックで、重要な概念とその関係を理解することが含まれます。`,
    ],
    [Language.zh_CN]: [
      `您询问的是：**${prompt}**\n\n这是一个${level === 0 ? '基础' : level === 1 ? '实用' : '高级'}主题，涉及理解关键概念及其关系。`,
    ],
    [Language.ko_KR]: [
      `다음에 대해 질문하고 계십니다: **${prompt}**\n\n이것은 ${level === 0 ? '기본적인' : level === 1 ? '실용적인' : '고급'} 주제로 핵심 개념과 그 관계를 이해하는 것을 포함합니다.`,
    ],
    [Language.tr_TR]: [
      `Şunu soruyorsunuz: **${prompt}**\n\nBu, ${level === 0 ? 'temel' : level === 1 ? 'pratik' : 'ileri düzey'} bir konudur ve temel kavramları ve ilişkilerini anlamayı içerir.`,
    ],
    [Language.ar_SA]: [
      `أنت تسأل عن: **${prompt}**\n\nهذا موضوع ${level === 0 ? 'أساسي' : level === 1 ? 'عملي' : 'متقدم'} يتضمن فهم المفاهيم الأساسية وعلاقاتها.`,
    ],
    [Language.hi_IN]: [
      `आप पूछ रहे हैं: **${prompt}**\n\nयह एक ${level === 0 ? 'मौलिक' : level === 1 ? 'व्यावहारिक' : 'उन्नत'} विषय है जिसमें प्रमुख अवधारणाओं और उनके संबंधों को समझना शामिल है।`,
    ],
  };

  const langTemplates = templates[language] || templates[Language.en_US];
  return langTemplates[0];
}

function generateBreakdown(prompt: string, language: Language, level: ExplanationLevel): string {
  const templates: Record<Language, string> = {
    [Language.en_US]: `Let's break this down into manageable parts:\n\n1. **Foundation**: ${level === 0 ? 'Starting with the basics' : level === 1 ? 'Building on core principles' : 'Examining underlying mechanisms'}\n2. **Key Components**: The main elements involved\n3. **Relationships**: How these parts interact\n4. **Context**: Where this fits in the bigger picture`,
    [Language.de_DE]: `Lassen Sie uns dies in überschaubare Teile aufteilen:\n\n1. **Grundlage**: ${level === 0 ? 'Beginnen mit den Grundlagen' : level === 1 ? 'Aufbau auf Kernprinzipien' : 'Untersuchung zugrunde liegender Mechanismen'}\n2. **Hauptkomponenten**: Die beteiligten Hauptelemente\n3. **Beziehungen**: Wie diese Teile interagieren\n4. **Kontext**: Wo dies ins größere Bild passt`,
    [Language.es_ES]: `Desglosemos esto en partes manejables:\n\n1. **Fundamento**: ${level === 0 ? 'Comenzando con lo básico' : level === 1 ? 'Construyendo sobre principios fundamentales' : 'Examinando mecanismos subyacentes'}\n2. **Componentes Clave**: Los elementos principales involucrados\n3. **Relaciones**: Cómo interactúan estas partes\n4. **Contexto**: Dónde encaja esto en el panorama general`,
    [Language.fr_FR]: `Décomposons cela en parties gérables:\n\n1. **Fondation**: ${level === 0 ? 'Commencer par les bases' : level === 1 ? 'S\'appuyer sur les principes fondamentaux' : 'Examiner les mécanismes sous-jacents'}\n2. **Composants Clés**: Les principaux éléments impliqués\n3. **Relations**: Comment ces parties interagissent\n4. **Contexte**: Où cela s'inscrit dans le tableau d'ensemble`,
    [Language.pt_PT]: `Vamos dividir isso em partes gerenciáveis:\n\n1. **Fundação**: ${level === 0 ? 'Começando com o básico' : level === 1 ? 'Construindo sobre princípios fundamentais' : 'Examinando mecanismos subjacentes'}\n2. **Componentes Principais**: Os principais elementos envolvidos\n3. **Relações**: Como essas partes interagem\n4. **Contexto**: Onde isso se encaixa no quadro geral`,
    [Language.it_IT]: `Scomponiamo questo in parti gestibili:\n\n1. **Fondazione**: ${level === 0 ? 'Iniziando con le basi' : level === 1 ? 'Costruendo sui principi fondamentali' : 'Esaminando i meccanismi sottostanti'}\n2. **Componenti Chiave**: Gli elementi principali coinvolti\n3. **Relazioni**: Come queste parti interagiscono\n4. **Contesto**: Dove questo si inserisce nel quadro generale`,
    [Language.ru_RU]: `Давайте разобьем это на управляемые части:\n\n1. **Основа**: ${level === 0 ? 'Начиная с основ' : level === 1 ? 'Опираясь на основные принципы' : 'Изучение базовых механизмов'}\n2. **Ключевые Компоненты**: Основные задействованные элементы\n3. **Взаимосвязи**: Как эти части взаимодействуют\n4. **Контекст**: Где это вписывается в общую картину`,
    [Language.ja_JP]: `これを管理可能な部分に分解しましょう：\n\n1. **基礎**: ${level === 0 ? '基本から始める' : level === 1 ? '核心原則に基づく' : '基礎メカニズムの検討'}\n2. **主要コンポーネント**: 関与する主要要素\n3. **関係**: これらの部分がどのように相互作用するか\n4. **コンテキスト**: これが全体像のどこに当てはまるか`,
    [Language.zh_CN]: `让我们将其分解为可管理的部分：\n\n1. **基础**: ${level === 0 ? '从基础开始' : level === 1 ? '建立在核心原则上' : '检查底层机制'}\n2. **关键组件**: 涉及的主要元素\n3. **关系**: 这些部分如何相互作用\n4. **背景**: 这在更大的图景中的位置`,
    [Language.ko_KR]: `이것을 관리 가능한 부분으로 나누어 봅시다:\n\n1. **기초**: ${level === 0 ? '기본부터 시작' : level === 1 ? '핵심 원칙 기반 구축' : '기본 메커니즘 검토'}\n2. **주요 구성 요소**: 관련된 주요 요소\n3. **관계**: 이러한 부분이 어떻게 상호 작용하는지\n4. **맥락**: 이것이 더 큰 그림에서 어디에 맞는지`,
    [Language.tr_TR]: `Bunu yönetilebilir parçalara ayıralım:\n\n1. **Temel**: ${level === 0 ? 'Temellerle başlama' : level === 1 ? 'Temel ilkeler üzerine inşa etme' : 'Altta yatan mekanizmaları inceleme'}\n2. **Ana Bileşenler**: İlgili ana öğeler\n3. **İlişkiler**: Bu parçalar nasıl etkileşime giriyor\n4. **Bağlam**: Bunun büyük resimde nereye uyduğu`,
    [Language.ar_SA]: `دعنا نقسم هذا إلى أجزاء يمكن إدارتها:\n\n1. **الأساس**: ${level === 0 ? 'البدء بالأساسيات' : level === 1 ? 'البناء على المبادئ الأساسية' : 'فحص الآليات الأساسية'}\n2. **المكونات الرئيسية**: العناصر الرئيسية المعنية\n3. **العلاقات**: كيف تتفاعل هذه الأجزاء\n4. **السياق**: أين يتناسب هذا في الصورة الأكبر`,
    [Language.hi_IN]: `आइए इसे प्रबंधनीय भागों में विभाजित करें:\n\n1. **नींव**: ${level === 0 ? 'मूल बातों से शुरुआत' : level === 1 ? 'मुख्य सिद्धांतों पर निर्माण' : 'अंतर्निहित तंत्र की जांच'}\n2. **मुख्य घटक**: शामिल मुख्य तत्व\n3. **संबंध**: ये भाग कैसे परस्पर क्रिया करते हैं\n4. **संदर्भ**: यह बड़ी तस्वीर में कहाँ फिट बैठता है`,
  };

  return templates[language] || templates[Language.en_US];
}

function generateSolution(prompt: string, language: Language, level: ExplanationLevel): string {
  const templates: Record<Language, string> = {
    [Language.en_US]: `Here's a ${level === 0 ? 'simple' : level === 1 ? 'structured' : 'comprehensive'} approach:\n\n**Step 1**: Identify the requirements and constraints\n- Understand what you're trying to achieve\n- Note any limitations or specific conditions\n\n**Step 2**: Plan your approach\n- Choose the right method or strategy\n- Consider alternatives and trade-offs\n\n**Step 3**: Implement systematically\n- Start with the foundation\n- Build incrementally and test as you go\n\n**Step 4**: Verify and refine\n- Check your results\n- Make adjustments as needed`,
    [Language.de_DE]: `Hier ist ein ${level === 0 ? 'einfacher' : level === 1 ? 'strukturierter' : 'umfassender'} Ansatz:\n\n**Schritt 1**: Anforderungen und Einschränkungen identifizieren\n- Verstehen Sie, was Sie erreichen möchten\n- Notieren Sie Einschränkungen oder spezifische Bedingungen\n\n**Schritt 2**: Ihren Ansatz planen\n- Wählen Sie die richtige Methode oder Strategie\n- Berücksichtigen Sie Alternativen und Kompromisse\n\n**Schritt 3**: Systematisch umsetzen\n- Beginnen Sie mit der Grundlage\n- Bauen Sie schrittweise auf und testen Sie dabei\n\n**Schritt 4**: Überprüfen und verfeinern\n- Überprüfen Sie Ihre Ergebnisse\n- Nehmen Sie bei Bedarf Anpassungen vor`,
    [Language.es_ES]: `Aquí hay un enfoque ${level === 0 ? 'simple' : level === 1 ? 'estructurado' : 'integral'}:\n\n**Paso 1**: Identificar requisitos y restricciones\n- Comprende lo que intentas lograr\n- Anota limitaciones o condiciones específicas\n\n**Paso 2**: Planifica tu enfoque\n- Elige el método o estrategia correcta\n- Considera alternativas y compensaciones\n\n**Paso 3**: Implementa sistemáticamente\n- Comienza con la base\n- Construye incrementalmente y prueba sobre la marcha\n\n**Paso 4**: Verifica y refina\n- Verifica tus resultados\n- Haz ajustes según sea necesario`,
    [Language.fr_FR]: `Voici une approche ${level === 0 ? 'simple' : level === 1 ? 'structurée' : 'complète'}:\n\n**Étape 1**: Identifier les exigences et les contraintes\n- Comprendre ce que vous essayez d'accomplir\n- Noter les limitations ou conditions spécifiques\n\n**Étape 2**: Planifier votre approche\n- Choisir la bonne méthode ou stratégie\n- Considérer les alternatives et les compromis\n\n**Étape 3**: Mettre en œuvre systématiquement\n- Commencer par la fondation\n- Construire progressivement et tester au fur et à mesure\n\n**Étape 4**: Vérifier et affiner\n- Vérifier vos résultats\n- Faire des ajustements si nécessaire`,
    [Language.pt_PT]: `Aqui está uma abordagem ${level === 0 ? 'simples' : level === 1 ? 'estruturada' : 'abrangente'}:\n\n**Passo 1**: Identificar requisitos e restrições\n- Entenda o que você está tentando alcançar\n- Anote limitações ou condições específicas\n\n**Passo 2**: Planeje sua abordagem\n- Escolha o método ou estratégia certa\n- Considere alternativas e compensações\n\n**Passo 3**: Implemente sistematicamente\n- Comece com a base\n- Construa incrementalmente e teste conforme avança\n\n**Passo 4**: Verifique e refine\n- Verifique seus resultados\n- Faça ajustes conforme necessário`,
    [Language.it_IT]: `Ecco un approccio ${level === 0 ? 'semplice' : level === 1 ? 'strutturato' : 'completo'}:\n\n**Passo 1**: Identificare requisiti e vincoli\n- Capire cosa stai cercando di ottenere\n- Annotare limitazioni o condizioni specifiche\n\n**Passo 2**: Pianificare il tuo approccio\n- Scegliere il metodo o la strategia giusta\n- Considerare alternative e compromessi\n\n**Passo 3**: Implementare sistematicamente\n- Iniziare con la base\n- Costruire incrementalmente e testare man mano\n\n**Passo 4**: Verificare e perfezionare\n- Controllare i risultati\n- Apportare modifiche se necessario`,
    [Language.ru_RU]: `Вот ${level === 0 ? 'простой' : level === 1 ? 'структурированный' : 'всесторонний'} подход:\n\n**Шаг 1**: Определите требования и ограничения\n- Поймите, чего вы пытаетесь достичь\n- Отметьте ограничения или конкретные условия\n\n**Шаг 2**: Спланируйте свой подход\n- Выберите правильный метод или стратегию\n- Рассмотрите альтернативы и компромиссы\n\n**Шаг 3**: Реализуйте систематически\n- Начните с основы\n- Стройте постепенно и тестируйте по ходу\n\n**Шаг 4**: Проверьте и усовершенствуйте\n- Проверьте свои результаты\n- Внесите корректировки по мере необходимости`,
    [Language.ja_JP]: `これは${level === 0 ? 'シンプルな' : level === 1 ? '構造化された' : '包括的な'}アプローチです：\n\n**ステップ1**: 要件と制約を特定する\n- 達成しようとしていることを理解する\n- 制限や特定の条件を記録する\n\n**ステップ2**: アプローチを計画する\n- 適切な方法または戦略を選択する\n- 代替案とトレードオフを検討する\n\n**ステップ3**: 体系的に実装する\n- 基礎から始める\n- 段階的に構築し、進めながらテストする\n\n**ステップ4**: 検証して改善する\n- 結果を確認する\n- 必要に応じて調整する`,
    [Language.zh_CN]: `这是一个${level === 0 ? '简单的' : level === 1 ? '结构化的' : '全面的'}方法：\n\n**步骤1**: 确定需求和约束\n- 了解您要实现的目标\n- 记录限制或特定条件\n\n**步骤2**: 规划您的方法\n- 选择正确的方法或策略\n- 考虑替代方案和权衡\n\n**步骤3**: 系统地实施\n- 从基础开始\n- 逐步构建并在进行中测试\n\n**步骤4**: 验证和完善\n- 检查您的结果\n- 根据需要进行调整`,
    [Language.ko_KR]: `다음은 ${level === 0 ? '간단한' : level === 1 ? '구조화된' : '포괄적인'} 접근 방식입니다:\n\n**1단계**: 요구 사항 및 제약 조건 식별\n- 달성하려는 것을 이해하십시오\n- 제한 사항이나 특정 조건을 기록하십시오\n\n**2단계**: 접근 방식 계획\n- 올바른 방법이나 전략을 선택하십시오\n- 대안과 절충안을 고려하십시오\n\n**3단계**: 체계적으로 구현\n- 기초부터 시작하십시오\n- 점진적으로 구축하고 진행하면서 테스트하십시오\n\n**4단계**: 검증 및 개선\n- 결과를 확인하십시오\n- 필요에 따라 조정하십시오`,
    [Language.tr_TR]: `İşte ${level === 0 ? 'basit' : level === 1 ? 'yapılandırılmış' : 'kapsamlı'} bir yaklaşım:\n\n**Adım 1**: Gereksinimleri ve kısıtlamaları belirleyin\n- Neyi başarmaya çalıştığınızı anlayın\n- Sınırlamaları veya belirli koşulları not edin\n\n**Adım 2**: Yaklaşımınızı planlayın\n- Doğru yöntemi veya stratejiyi seçin\n- Alternatifleri ve ödünleri göz önünde bulundurun\n\n**Adım 3**: Sistematik olarak uygulayın\n- Temelle başlayın\n- Aşamalı olarak oluşturun ve ilerlerken test edin\n\n**Adım 4**: Doğrulayın ve iyileştirin\n- Sonuçlarınızı kontrol edin\n- Gerektiğinde ayarlamalar yapın`,
    [Language.ar_SA]: `إليك نهج ${level === 0 ? 'بسيط' : level === 1 ? 'منظم' : 'شامل'}:\n\n**الخطوة 1**: تحديد المتطلبات والقيود\n- فهم ما تحاول تحقيقه\n- لاحظ أي قيود أو شروط محددة\n\n**الخطوة 2**: خطط لنهجك\n- اختر الطريقة أو الاستراتيجية الصحيحة\n- ضع في اعتبارك البدائل والمقايضات\n\n**الخطوة 3**: نفذ بشكل منهجي\n- ابدأ بالأساس\n- ابنِ تدريجيًا واختبر أثناء التقدم\n\n**الخطوة 4**: تحقق وحسّن\n- تحقق من نتائجك\n- قم بإجراء التعديلات حسب الحاجة`,
    [Language.hi_IN]: `यहाँ एक ${level === 0 ? 'सरल' : level === 1 ? 'संरचित' : 'व्यापक'} दृष्टिकोण है:\n\n**चरण 1**: आवश्यकताओं और बाधाओं की पहचान करें\n- समझें कि आप क्या हासिल करने की कोशिश कर रहे हैं\n- किसी भी सीमा या विशिष्ट शर्तों को नोट करें\n\n**चरण 2**: अपने दृष्टिकोण की योजना बनाएं\n- सही विधि या रणनीति चुनें\n- विकल्पों और व्यापार-बंदों पर विचार करें\n\n**चरण 3**: व्यवस्थित रूप से लागू करें\n- नींव से शुरू करें\n- क्रमिक रूप से निर्माण करें और जैसे-जैसे आगे बढ़ें परीक्षण करें\n\n**चरण 4**: सत्यापित करें और परिष्कृत करें\n- अपने परिणामों की जांच करें\n- आवश्यकतानुसार समायोजन करें`,
  };

  return templates[language] || templates[Language.en_US];
}

function generateExamples(prompt: string, language: Language, level: ExplanationLevel): string {
  const templates: Record<Language, string> = {
    [Language.en_US]: `${level === 0 ? 'Simple example' : level === 1 ? 'Practical examples' : 'Advanced examples'}:\n\n**Example 1**: A basic scenario\n- Shows the fundamental concept in action\n- Easy to understand and replicate\n\n**Example 2**: A real-world application\n- Demonstrates practical usage\n- Highlights common patterns and best practices\n\n${level === 2 ? '**Example 3**: An edge case\n- Explores boundary conditions\n- Shows how to handle complex scenarios' : ''}`,
    [Language.de_DE]: `${level === 0 ? 'Einfaches Beispiel' : level === 1 ? 'Praktische Beispiele' : 'Fortgeschrittene Beispiele'}:\n\n**Beispiel 1**: Ein grundlegendes Szenario\n- Zeigt das grundlegende Konzept in Aktion\n- Leicht zu verstehen und zu replizieren\n\n**Beispiel 2**: Eine reale Anwendung\n- Demonstriert praktische Verwendung\n- Hebt gängige Muster und Best Practices hervor`,
    [Language.es_ES]: `${level === 0 ? 'Ejemplo simple' : level === 1 ? 'Ejemplos prácticos' : 'Ejemplos avanzados'}:\n\n**Ejemplo 1**: Un escenario básico\n- Muestra el concepto fundamental en acción\n- Fácil de entender y replicar\n\n**Ejemplo 2**: Una aplicación del mundo real\n- Demuestra el uso práctico\n- Destaca patrones comunes y mejores prácticas`,
    [Language.fr_FR]: `${level === 0 ? 'Exemple simple' : level === 1 ? 'Exemples pratiques' : 'Exemples avancés'}:\n\n**Exemple 1**: Un scénario de base\n- Montre le concept fondamental en action\n- Facile à comprendre et à reproduire\n\n**Exemple 2**: Une application du monde réel\n- Démontre l'utilisation pratique\n- Met en évidence les modèles courants et les meilleures pratiques`,
    [Language.pt_PT]: `${level === 0 ? 'Exemplo simples' : level === 1 ? 'Exemplos práticos' : 'Exemplos avançados'}:\n\n**Exemplo 1**: Um cenário básico\n- Mostra o conceito fundamental em ação\n- Fácil de entender e replicar\n\n**Exemplo 2**: Uma aplicação do mundo real\n- Demonstra uso prático\n- Destaca padrões comuns e melhores práticas`,
    [Language.it_IT]: `${level === 0 ? 'Esempio semplice' : level === 1 ? 'Esempi pratici' : 'Esempi avanzati'}:\n\n**Esempio 1**: Uno scenario di base\n- Mostra il concetto fondamentale in azione\n- Facile da capire e replicare\n\n**Esempio 2**: Un'applicazione del mondo reale\n- Dimostra l'uso pratico\n- Evidenzia modelli comuni e best practice`,
    [Language.ru_RU]: `${level === 0 ? 'Простой пример' : level === 1 ? 'Практические примеры' : 'Продвинутые примеры'}:\n\n**Пример 1**: Базовый сценарий\n- Показывает фундаментальную концепцию в действии\n- Легко понять и воспроизвести\n\n**Пример 2**: Реальное приложение\n- Демонстрирует практическое использование\n- Подчеркивает общие шаблоны и лучшие практики`,
    [Language.ja_JP]: `${level === 0 ? 'シンプルな例' : level === 1 ? '実用的な例' : '高度な例'}:\n\n**例1**: 基本的なシナリオ\n- 基本概念の実践を示す\n- 理解しやすく再現可能\n\n**例2**: 実世界のアプリケーション\n- 実用的な使用法を示す\n- 一般的なパターンとベストプラクティスを強調`,
    [Language.zh_CN]: `${level === 0 ? '简单示例' : level === 1 ? '实用示例' : '高级示例'}:\n\n**示例1**: 基本场景\n- 展示基本概念的实际应用\n- 易于理解和复制\n\n**示例2**: 现实世界应用\n- 演示实际用法\n- 突出常见模式和最佳实践`,
    [Language.ko_KR]: `${level === 0 ? '간단한 예' : level === 1 ? '실용적인 예' : '고급 예'}:\n\n**예 1**: 기본 시나리오\n- 기본 개념의 실제 적용을 보여줍니다\n- 이해하고 복제하기 쉽습니다\n\n**예 2**: 실제 응용 프로그램\n- 실용적인 사용법을 보여줍니다\n- 일반적인 패턴과 모범 사례를 강조합니다`,
    [Language.tr_TR]: `${level === 0 ? 'Basit örnek' : level === 1 ? 'Pratik örnekler' : 'Gelişmiş örnekler'}:\n\n**Örnek 1**: Temel bir senaryo\n- Temel kavramı uygulamada gösterir\n- Anlaşılması ve çoğaltılması kolay\n\n**Örnek 2**: Gerçek dünya uygulaması\n- Pratik kullanımı gösterir\n- Yaygın kalıpları ve en iyi uygulamaları vurgular`,
    [Language.ar_SA]: `${level === 0 ? 'مثال بسيط' : level === 1 ? 'أمثلة عملية' : 'أمثلة متقدمة'}:\n\n**مثال 1**: سيناريو أساسي\n- يوضح المفهوم الأساسي في العمل\n- سهل الفهم والتكرار\n\n**مثال 2**: تطبيق من العالم الحقيقي\n- يوضح الاستخدام العملي\n- يسلط الضوء على الأنماط الشائعة وأفضل الممارسات`,
    [Language.hi_IN]: `${level === 0 ? 'सरल उदाहरण' : level === 1 ? 'व्यावहारिक उदाहरण' : 'उन्नत उदाहरण'}:\n\n**उदाहरण 1**: एक बुनियादी परिदृश्य\n- मौलिक अवधारणा को क्रिया में दिखाता है\n- समझने और दोहराने में आसान\n\n**उदाहरण 2**: एक वास्तविक दुनिया का अनुप्रयोग\n- व्यावहारिक उपयोग प्रदर्शित करता है\n- सामान्य पैटर्न और सर्वोत्तम प्रथाओं को उजागर करता है`,
  };

  return templates[language] || templates[Language.en_US];
}

function generateSummary(prompt: string, language: Language, level: ExplanationLevel): string {
  const templates: Record<Language, string> = {
    [Language.en_US]: `**Key Takeaways**:\n- We identified the core issue and broke it down into manageable parts\n- We explored a systematic approach to solving the problem\n- We looked at practical examples to reinforce understanding\n\n**Next Steps**:\n1. ${level === 0 ? 'Practice with simple examples' : level === 1 ? 'Apply this to your specific use case' : 'Explore edge cases and optimizations'}\n2. ${level === 0 ? 'Ask questions if anything is unclear' : level === 1 ? 'Experiment with variations' : 'Consider performance and scalability'}\n3. Build on this foundation to tackle more complex challenges\n\nFeel free to ask follow-up questions or request clarification on any part!`,
    [Language.de_DE]: `**Wichtige Erkenntnisse**:\n- Wir haben das Kernproblem identifiziert und in überschaubare Teile aufgeteilt\n- Wir haben einen systematischen Ansatz zur Problemlösung untersucht\n- Wir haben praktische Beispiele betrachtet, um das Verständnis zu vertiefen\n\n**Nächste Schritte**:\n1. ${level === 0 ? 'Mit einfachen Beispielen üben' : level === 1 ? 'Auf Ihren spezifischen Anwendungsfall anwenden' : 'Randfälle und Optimierungen erkunden'}\n2. ${level === 0 ? 'Fragen stellen, wenn etwas unklar ist' : level === 1 ? 'Mit Variationen experimentieren' : 'Leistung und Skalierbarkeit berücksichtigen'}\n3. Auf dieser Grundlage aufbauen, um komplexere Herausforderungen anzugehen`,
    [Language.es_ES]: `**Conclusiones clave**:\n- Identificamos el problema central y lo dividimos en partes manejables\n- Exploramos un enfoque sistemático para resolver el problema\n- Examinamos ejemplos prácticos para reforzar la comprensión\n\n**Próximos pasos**:\n1. ${level === 0 ? 'Practicar con ejemplos simples' : level === 1 ? 'Aplicar esto a tu caso de uso específico' : 'Explorar casos extremos y optimizaciones'}\n2. ${level === 0 ? 'Hacer preguntas si algo no está claro' : level === 1 ? 'Experimentar con variaciones' : 'Considerar rendimiento y escalabilidad'}\n3. Construir sobre esta base para abordar desafíos más complejos`,
    [Language.fr_FR]: `**Points clés à retenir**:\n- Nous avons identifié le problème principal et l'avons décomposé en parties gérables\n- Nous avons exploré une approche systématique pour résoudre le problème\n- Nous avons examiné des exemples pratiques pour renforcer la compréhension\n\n**Prochaines étapes**:\n1. ${level === 0 ? 'Pratiquer avec des exemples simples' : level === 1 ? 'Appliquer cela à votre cas d\'utilisation spécifique' : 'Explorer les cas limites et les optimisations'}\n2. ${level === 0 ? 'Poser des questions si quelque chose n\'est pas clair' : level === 1 ? 'Expérimenter avec des variations' : 'Considérer les performances et l\'évolutivité'}\n3. S'appuyer sur cette base pour relever des défis plus complexes`,
    [Language.pt_PT]: `**Principais conclusões**:\n- Identificamos o problema central e o dividimos em partes gerenciáveis\n- Exploramos uma abordagem sistemática para resolver o problema\n- Examinamos exemplos práticos para reforçar a compreensão\n\n**Próximos passos**:\n1. ${level === 0 ? 'Praticar com exemplos simples' : level === 1 ? 'Aplicar isso ao seu caso de uso específico' : 'Explorar casos extremos e otimizações'}\n2. ${level === 0 ? 'Fazer perguntas se algo não estiver claro' : level === 1 ? 'Experimentar com variações' : 'Considerar desempenho e escalabilidade'}\n3. Construir sobre esta base para enfrentar desafios mais complexos`,
    [Language.it_IT]: `**Punti chiave**:\n- Abbiamo identificato il problema centrale e lo abbiamo scomposto in parti gestibili\n- Abbiamo esplorato un approccio sistematico per risolvere il problema\n- Abbiamo esaminato esempi pratici per rafforzare la comprensione\n\n**Prossimi passi**:\n1. ${level === 0 ? 'Praticare con esempi semplici' : level === 1 ? 'Applicare questo al tuo caso d\'uso specifico' : 'Esplorare casi limite e ottimizzazioni'}\n2. ${level === 0 ? 'Fare domande se qualcosa non è chiaro' : level === 1 ? 'Sperimentare con variazioni' : 'Considerare prestazioni e scalabilità'}\n3. Costruire su questa base per affrontare sfide più complesse`,
    [Language.ru_RU]: `**Ключевые выводы**:\n- Мы определили основную проблему и разбили ее на управляемые части\n- Мы изучили систематический подход к решению проблемы\n- Мы рассмотрели практические примеры для закрепления понимания\n\n**Следующие шаги**:\n1. ${level === 0 ? 'Практиковаться с простыми примерами' : level === 1 ? 'Применить это к вашему конкретному случаю использования' : 'Изучить граничные случаи и оптимизации'}\n2. ${level === 0 ? 'Задавать вопросы, если что-то неясно' : level === 1 ? 'Экспериментировать с вариациями' : 'Рассмотреть производительность и масштабируемость'}\n3. Опираться на эту основу для решения более сложных задач`,
    [Language.ja_JP]: `**重要なポイント**:\n- 核心的な問題を特定し、管理可能な部分に分解しました\n- 問題を解決するための体系的なアプローチを探りました\n- 理解を深めるために実用的な例を見ました\n\n**次のステップ**:\n1. ${level === 0 ? 'シンプルな例で練習する' : level === 1 ? '特定のユースケースに適用する' : 'エッジケースと最適化を探る'}\n2. ${level === 0 ? '不明な点があれば質問する' : level === 1 ? 'バリエーションを試す' : 'パフォーマンスとスケーラビリティを考慮する'}\n3. この基礎の上に構築して、より複雑な課題に取り組む`,
    [Language.zh_CN]: `**关键要点**:\n- 我们确定了核心问题并将其分解为可管理的部分\n- 我们探索了解决问题的系统方法\n- 我们查看了实用示例以加强理解\n\n**下一步**:\n1. ${level === 0 ? '用简单的例子练习' : level === 1 ? '将其应用于您的特定用例' : '探索边缘情况和优化'}\n2. ${level === 0 ? '如果有任何不清楚的地方请提问' : level === 1 ? '尝试变化' : '考虑性能和可扩展性'}\n3. 在此基础上构建以应对更复杂的挑战`,
    [Language.ko_KR]: `**주요 요점**:\n- 핵심 문제를 식별하고 관리 가능한 부분으로 나누었습니다\n- 문제를 해결하기 위한 체계적인 접근 방식을 탐색했습니다\n- 이해를 강화하기 위해 실용적인 예를 살펴보았습니다\n\n**다음 단계**:\n1. ${level === 0 ? '간단한 예로 연습하기' : level === 1 ? '특정 사용 사례에 적용하기' : '엣지 케이스 및 최적화 탐색'}\n2. ${level === 0 ? '불분명한 것이 있으면 질문하기' : level === 1 ? '변형 실험하기' : '성능 및 확장성 고려'}\n3. 이 기초 위에 구축하여 더 복잡한 과제를 해결하기`,
    [Language.tr_TR]: `**Önemli Çıkarımlar**:\n- Ana sorunu belirledik ve yönetilebilir parçalara ayırdık\n- Sorunu çözmek için sistematik bir yaklaşım keşfettik\n- Anlayışı pekiştirmek için pratik örneklere baktık\n\n**Sonraki Adımlar**:\n1. ${level === 0 ? 'Basit örneklerle pratik yapın' : level === 1 ? 'Bunu özel kullanım durumunuza uygulayın' : 'Uç durumları ve optimizasyonları keşfedin'}\n2. ${level === 0 ? 'Bir şey belirsizse sorular sorun' : level === 1 ? 'Varyasyonlarla deney yapın' : 'Performans ve ölçeklenebilirliği göz önünde bulundurun'}\n3. Daha karmaşık zorlukları ele almak için bu temel üzerine inşa edin`,
    [Language.ar_SA]: `**النقاط الرئيسية**:\n- حددنا المشكلة الأساسية وقسمناها إلى أجزاء يمكن إدارتها\n- استكشفنا نهجًا منهجيًا لحل المشكلة\n- نظرنا في أمثلة عملية لتعزيز الفهم\n\n**الخطوات التالية**:\n1. ${level === 0 ? 'تدرب بأمثلة بسيطة' : level === 1 ? 'طبق هذا على حالة الاستخدام المحددة الخاصة بك' : 'استكشف الحالات الحدية والتحسينات'}\n2. ${level === 0 ? 'اطرح أسئلة إذا كان هناك شيء غير واضح' : level === 1 ? 'جرب مع الاختلافات' : 'ضع في اعتبارك الأداء وقابلية التوسع'}\n3. ابنِ على هذا الأساس لمعالجة تحديات أكثر تعقيدًا`,
    [Language.hi_IN]: `**मुख्य बातें**:\n- हमने मुख्य समस्या की पहचान की और इसे प्रबंधनीय भागों में विभाजित किया\n- हमने समस्या को हल करने के लिए एक व्यवस्थित दृष्टिकोण की खोज की\n- हमने समझ को मजबूत करने के लिए व्यावहारिक उदाहरणों को देखा\n\n**अगले कदम**:\n1. ${level === 0 ? 'सरल उदाहरणों के साथ अभ्यास करें' : level === 1 ? 'इसे अपने विशिष्ट उपयोग मामले पर लागू करें' : 'किनारे के मामलों और अनुकूलन का अन्वेषण करें'}\n2. ${level === 0 ? 'यदि कुछ अस्पष्ट है तो प्रश्न पूछें' : level === 1 ? 'विविधताओं के साथ प्रयोग करें' : 'प्रदर्शन और स्केलेबिलिटी पर विचार करें'}\n3. अधिक जटिल चुनौतियों से निपटने के लिए इस नींव पर निर्माण करें`,
  };

  return templates[language] || templates[Language.en_US];
}
