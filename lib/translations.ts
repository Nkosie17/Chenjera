// Translations must be reviewed by a fluent speaker before final use.
//
// Every user-facing string in Chenjera lives in this file.
// - en: English
// - sn: Shona (chiShona)
// - nd: Ndebele (isiNdebele)
// Reasons may contain the placeholder {phrase}, which is replaced with the
// words found in the message.

import type { SampleId } from './samples'
import type { Channel, Lang, RiskLevel, Sender, SignalId, ThreatType } from './types'

export interface Dictionary {
  langName: string
  appName: string
  tagline: string
  languageLabel: string
  input: {
    heading: string
    messageLabel: string
    messagePlaceholder: string
    channelLabel: string
    senderLabel: string
    check: string
    samplesLabel: string
    emptyError: string
  }
  channels: Record<Channel, string>
  senders: Record<Sender, string>
  samples: Record<SampleId, string>
  result: {
    heading: string
    verdict: Record<RiskLevel, string>
    riskLabel: string
    risk: Record<RiskLevel, string>
    scoreLabel: string
    threatLabel: string
    whyHeading: string
    highlightedLabel: string
    noFlags: string
    whatToDo: string
    confirmHeading: string
    confirmIntro: string
    reportButton: string
  }
  threats: Record<ThreatType, string>
  reasons: Record<SignalId, string>
  actions: Record<ThreatType, string[]>
  verifySteps: string[]
  report: {
    title: string
    description: string
    header: string
    date: string
    channel: string
    sender: string
    threat: string
    risk: string
    score: string
    message: string
    reasons: string
    copy: string
    copied: string
    copyFailed: string
    close: string
  }
  footer: {
    privacy: string
    disclaimer: string
  }
}

const en: Dictionary = {
  langName: 'English',
  appName: 'Chenjera',
  tagline: 'Check before you trust',
  languageLabel: 'Language',
  input: {
    heading: 'Check a message',
    messageLabel: 'Paste the message you received',
    messagePlaceholder:
      'Paste an SMS, WhatsApp or email message here, or describe a voice note or video...',
    channelLabel: 'Where did it come from?',
    senderLabel: 'Do you know the sender?',
    check: 'Check message',
    samplesLabel: 'Or try an example:',
    emptyError: 'Please paste a message first.',
  },
  channels: {
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    email: 'Email',
    voice: 'Voice message',
    video: 'Video',
    web: 'Web link',
  },
  senders: {
    known: 'Known sender',
    unknown: 'Unknown sender',
  },
  samples: {
    suspended: 'Account suspended',
    prize: 'You have won',
    pin: 'Failed payment',
    voice: 'Manager voice note',
    clinic: 'Clinic appointment',
    timetable: 'University timetable',
  },
  result: {
    heading: 'Result',
    verdict: {
      high: 'Likely scam',
      medium: 'Suspicious, be careful',
      low: 'Looks safe',
    },
    riskLabel: 'Risk',
    risk: { low: 'Low risk', medium: 'Medium risk', high: 'High risk' },
    scoreLabel: 'Risk score',
    threatLabel: 'Type',
    whyHeading: 'Why we think so',
    highlightedLabel: 'Warning words are highlighted:',
    noFlags: 'We did not find any common warning signs.',
    whatToDo: 'What you should do',
    confirmHeading: 'How to confirm this request',
    confirmIntro: 'Before you do anything, follow these steps:',
    reportButton: 'Report this',
  },
  threats: {
    phishing: 'Phishing',
    financial: 'Financial Scam',
    identity: 'Identity Fraud',
    maliciousLink: 'Malicious Link',
    aiThreat: 'AI-Enabled Threat',
    benign: 'Benign',
  },
  reasons: {
    credential:
      'It asks for private details ("{phrase}"). Real banks, networks and employers never ask for these by message.',
    money:
      'It asks you to send or move money ("{phrase}"). Scammers push for payment before you can check.',
    prize:
      'It says you have won something ("{phrase}"). You cannot win a prize you never entered.',
    urgency:
      'It tries to rush or scare you ("{phrase}"). Pressure is a common scam trick.',
    link: 'It wants you to open a link or file ("{phrase}"). This can lead to fake login pages or harmful downloads.',
    authority:
      'It claims to come from someone important ("{phrase}"). Scammers often pretend to be bosses, banks or officials.',
    voiceRequest:
      'It is a voice or video message that asks for money, details or quick action. Voices and faces can now be faked with AI.',
    unknownSender: 'You do not know the sender.',
    knownSender: 'It comes from a sender you know and has no warning signs.',
  },
  actions: {
    phishing: [
      'Do not click any link or reply with your details.',
      'Sign in only through the official app or website you normally use.',
      'If you already shared details, change your password and call your bank or provider now.',
      'Delete the message.',
    ],
    financial: [
      'Do not send money, your PIN or your mobile money details.',
      'Call your bank or mobile money provider on their official number to check.',
      'If you already sent money, tell your provider and the police straight away.',
      'Block the number.',
    ],
    identity: [
      'Never share your ID number, password or OTP with anyone.',
      'Contact the organisation using a number you already trust.',
      'If you shared details, change your passwords and tell your bank.',
      'Block and delete the message.',
    ],
    maliciousLink: [
      'Do not open the link or attachment.',
      'If you need the service, type the official website address yourself.',
      'Delete the message.',
    ],
    aiThreat: [
      'Do not act on the request yet, even if the voice or face seems real.',
      'Call the person back on a number you already have.',
      'Follow the steps below to confirm the request.',
    ],
    benign: [
      'This message looks normal. You can carry on as usual.',
      'Still, never share your PIN, password or OTP with anyone.',
    ],
  },
  verifySteps: [
    'Do not reply or pay through the same chat or number.',
    'Contact the person or organisation using a number or website you already have.',
    'Ask a question only the real person could answer, or use your agreed code word.',
    'For any payment, get a second person to approve before you send.',
    'If you cannot confirm it, do not act.',
  ],
  report: {
    title: 'Report this message',
    description:
      'Copy this summary and share it with your bank, mobile network, employer or the police.',
    header: 'Chenjera incident report',
    date: 'Date and time',
    channel: 'Received via',
    sender: 'Sender',
    threat: 'Threat type',
    risk: 'Risk level',
    score: 'Risk score',
    message: 'Message',
    reasons: 'Reasons',
    copy: 'Copy report',
    copied: 'Copied',
    copyFailed: 'Could not copy. Please select the text and copy it.',
    close: 'Close',
  },
  footer: {
    privacy:
      'Chenjera analyses text only. It never opens links. Your message is not stored.',
    disclaimer: 'Advice is a guide, not a guarantee.',
  },
}

const sn: Dictionary = {
  langName: 'chiShona',
  appName: 'Chenjera',
  tagline: 'Tarisa usati wavimba',
  languageLabel: 'Mutauro',
  input: {
    heading: 'Tarisa meseji',
    messageLabel: 'Isa meseji yawakagamuchira',
    messagePlaceholder:
      'Isa pano meseji yeSMS, WhatsApp kana email, kana kuti tsanangura meseji yezwi kana vhidhiyo...',
    channelLabel: 'Yakabva kupi?',
    senderLabel: 'Unoziva akaitumira here?',
    check: 'Tarisa meseji',
    samplesLabel: 'Kana edza muenzaniso:',
    emptyError: 'Isa meseji kutanga.',
  },
  channels: {
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    email: 'Email',
    voice: 'Meseji yezwi',
    video: 'Vhidhiyo',
    web: 'Link yewebhu',
  },
  senders: {
    known: 'Ndinomuziva',
    unknown: 'Handimuzive',
  },
  samples: {
    suspended: 'Akaundi yamiswa',
    prize: 'Wahwina',
    pin: 'Kubhadhara kwakundikana',
    voice: 'Zwi remaneja',
    clinic: 'Musi wekukiriniki',
    timetable: 'Purogiramu yeyunivhesiti',
  },
  result: {
    heading: 'Mhedzisiro',
    verdict: {
      high: 'Ingangove hutsotsi',
      medium: 'Inofungira, chenjera',
      low: 'Inoratidza kuchengeteka',
    },
    riskLabel: 'Njodzi',
    risk: { low: 'Njodzi shoma', medium: 'Njodzi yepakati', high: 'Njodzi huru' },
    scoreLabel: 'Mwero wenjodzi',
    threatLabel: 'Rudzi',
    whyHeading: 'Nei tichifunga kudaro',
    highlightedLabel: 'Mashoko ekuyambira akasimbiswa:',
    noFlags: 'Hatina kuwana zviratidzo zvakajairika zvehutsotsi.',
    whatToDo: 'Zvaunofanira kuita',
    confirmHeading: 'Maitiro ekusimbisa chikumbiro ichi',
    confirmIntro: 'Usati waita chero chinhu, tevera nhanho idzi:',
    reportButton: 'Taura nezvazvo',
  },
  threats: {
    phishing: 'Phishing (kubirwa ruzivo)',
    financial: 'Hutsotsi hwemari',
    identity: 'Kubirwa kwekuzivikanwa',
    maliciousLink: 'Link ine njodzi',
    aiThreat: 'Njodzi inoshandisa AI',
    benign: 'Hapana njodzi',
  },
  reasons: {
    credential:
      'Inokumbira ruzivo rwako rwakavanzika ("{phrase}"). Mabhangi, manetiweki nevashandirwi chaivo havambokumbiri izvi nemeseji.',
    money:
      'Inokumbira kuti utumire kana kufambisa mari ("{phrase}"). Matsotsi anokurumidzisa kubhadhara usati watarisa.',
    prize:
      'Inoti wahwina chimwe chinhu ("{phrase}"). Haugone kuhwina mubairo wausina kupinda.',
    urgency:
      'Inoedza kukukurumidzisa kana kukutyisa ("{phrase}"). Kumanikidza inzira yakajairika yematsotsi.',
    link: 'Inoda kuti uvhure link kana faira ("{phrase}"). Izvi zvinogona kukuendesa kunhema kana kuisa chirwere pafoni.',
    authority:
      'Inoti yabva kumunhu ane chinzvimbo ("{phrase}"). Matsotsi anowanzozviita mabhosi, mabhangi kana vakuru vehurumende.',
    voiceRequest:
      'Imeseji yezwi kana vhidhiyo inokumbira mari, ruzivo kana kukurumidza. Mazwi nezviso zvinogona kugadzirwa neAI.',
    unknownSender: 'Hauzive akaitumira.',
    knownSender: 'Yabva kumunhu waunoziva uye haina zviratidzo zvenjodzi.',
  },
  actions: {
    phishing: [
      'Usadzvanya link kana kupindura neruzivo rwako.',
      'Pinda chete kuburikidza neapp kana webhusaiti yepamutemo yaunogara uchishandisa.',
      'Kana wakatopa ruzivo, chinja pasiwedhi uye fonera bhangi kana mupi webasa izvozvi.',
      'Dzima meseji.',
    ],
    financial: [
      'Usatumira mari, PIN yako kana ruzivo rwemobile money.',
      'Fonera bhangi kana mupi wemobile money panhamba yavo yepamutemo kuti utarise.',
      'Kana wakatotumira mari, udza mupi webasa nemapurisa pakarepo.',
      'Vharira nhamba iyi.',
    ],
    identity: [
      'Usambopa munhu nhamba yeID yako, pasiwedhi kana OTP.',
      'Taura nesangano uchishandisa nhamba yaunovimba nayo.',
      'Kana wakapa ruzivo, chinja mapasiwedhi uye udza bhangi rako.',
      'Vharira uye dzima meseji.',
    ],
    maliciousLink: [
      'Usavhura link kana faira rakabatanidzwa.',
      'Kana uchida basa racho, nyora kero yewebhusaiti yepamutemo iwe pachako.',
      'Dzima meseji.',
    ],
    aiThreat: [
      'Usaita zvaunokumbirwa parizvino, kunyangwe zwi kana chiso zvichiratidza sezvechokwadi.',
      'Fonera munhu wacho panhamba yaunotova nayo.',
      'Tevera nhanho dziri pazasi kuti usimbise chikumbiro.',
    ],
    benign: [
      'Meseji iyi inoratidza kuva yakajairika. Unogona kuenderera mberi.',
      'Asi, usambopa munhu PIN yako, pasiwedhi kana OTP.',
    ],
  },
  verifySteps: [
    'Usapindura kana kubhadhara uchishandisa chat kana nhamba imwe chete iyoyo.',
    'Taura nemunhu kana sangano uchishandisa nhamba kana webhusaiti yaunotova nayo.',
    'Bvunza mubvunzo unongopindurwa nemunhu chaiye, kana shandisa shoko rechivande ramakabvumirana.',
    'Pakubhadhara kupi zvako, ita kuti mumwe munhu abvumire usati watumira.',
    'Kana usingakwanise kusimbisa, usaite chinhu.',
  ],
  report: {
    title: 'Taura nezve meseji iyi',
    description:
      'Kopa pfupiso iyi ugoipa bhangi rako, netiweki, mushandirwi kana mapurisa.',
    header: 'Chirevo cheChenjera',
    date: 'Zuva nenguva',
    channel: 'Yakauya nepa',
    sender: 'Akaitumira',
    threat: 'Rudzi rwenjodzi',
    risk: 'Mwero wenjodzi',
    score: 'Mamakisi enjodzi',
    message: 'Meseji',
    reasons: 'Zvikonzero',
    copy: 'Kopa chirevo',
    copied: 'Yakopwa',
    copyFailed: 'Hazvina kukopeka. Sarudza mashoko ugokopa.',
    close: 'Vhara',
  },
  footer: {
    privacy:
      'Chenjera inoongorora mashoko chete. Haivhuri maLink. Meseji yako haichengetwe.',
    disclaimer: 'Mazano aya igwara, kwete vimbiso.',
  },
}

const nd: Dictionary = {
  langName: 'isiNdebele',
  appName: 'Chenjera',
  tagline: 'Hlola ungakathembi',
  languageLabel: 'Ulimi',
  input: {
    heading: 'Hlola umlayezo',
    messageLabel: 'Faka umlayezo owamukeleyo',
    messagePlaceholder:
      'Faka lapha umlayezo we-SMS, WhatsApp loba i-email, kumbe uchasise umlayezo welizwi loba ividiyo...',
    channelLabel: 'Uvela ngaphi?',
    senderLabel: 'Uyamazi othumeleyo?',
    check: 'Hlola umlayezo',
    samplesLabel: 'Kumbe zama isibonelo:',
    emptyError: 'Faka umlayezo kuqala.',
  },
  channels: {
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    email: 'I-email',
    voice: 'Umlayezo welizwi',
    video: 'Ividiyo',
    web: 'Ilinki yewebhu',
  },
  senders: {
    known: 'Ngiyamazi',
    unknown: 'Angimazi',
  },
  samples: {
    suspended: 'I-akhawunti imisiwe',
    prize: 'Uwinile',
    pin: 'Inkokhelo yehlulekile',
    voice: 'Ilizwi lomphathi',
    clinic: 'Usuku lwekliniki',
    timetable: 'Uhlelo lweyunivesithi',
  },
  result: {
    heading: 'Umphumela',
    verdict: {
      high: 'Kungenzeka kuyinkohliso',
      medium: 'Kuyasolisa, qaphela',
      low: 'Kubonakala kuphephile',
    },
    riskLabel: 'Ingozi',
    risk: { low: 'Ingozi encane', medium: 'Ingozi ephakathi', high: 'Ingozi enkulu' },
    scoreLabel: 'Izinga lengozi',
    threatLabel: 'Uhlobo',
    whyHeading: 'Kungani sicabanga njalo',
    highlightedLabel: 'Amazwi ayisixwayiso aqhakanjisiwe:',
    noFlags: 'Asitholanga izimpawu ezijwayelekileyo zenkohliso.',
    whatToDo: 'Okumele ukwenze',
    confirmHeading: 'Indlela yokuqinisekisa isicelo lesi',
    confirmIntro: 'Ungakenzi lutho, landela lezi zinyathelo:',
    reportButton: 'Bika lokhu',
  },
  threats: {
    phishing: 'Phishing (ukwebiwa kolwazi)',
    financial: 'Inkohliso yemali',
    identity: 'Ukwebiwa kobuwena',
    maliciousLink: 'Ilinki eyingozi',
    aiThreat: 'Ingozi esebenzisa i-AI',
    benign: 'Akulangozi',
  },
  reasons: {
    credential:
      'Icela ulwazi lwakho oluyimfihlo ("{phrase}"). Amabhanga, amanethiwekhi labaqashi beqiniso kabacelanga lokhu ngomlayezo.',
    money:
      'Ikucela ukuthi uthumele kumbe udlulise imali ("{phrase}"). Abakhohlisi baphangisa inkokhelo ungakahloli.',
    prize:
      'Ithi uwinile okuthile ("{phrase}"). Ngeke uwine umklomelo ongazange ungene kuwo.',
    urgency:
      'Izama ukukuphangisa kumbe ukwesabisa ("{phrase}"). Ukucindezela kuyiqhinga elijwayelekileyo labakhohlisi.',
    link: 'Ifuna ukuthi uvule ilinki kumbe ifayili ("{phrase}"). Lokhu kungakuyisa emakhasini amanga kumbe kulethe igciwane.',
    authority:
      'Ithi ivela kumuntu oqakathekileyo ("{phrase}"). Abakhohlisi bazenza abaphathi, amabhanga kumbe izikhulu.',
    voiceRequest:
      'Ngumlayezo welizwi kumbe ividiyo ocela imali, ulwazi kumbe ukuphangisa. Amazwi lobuso sekungenziwa nge-AI.',
    unknownSender: 'Awumazi othumeleyo.',
    knownSender: 'Uvela kumuntu omaziyo njalo kawulazimpawu zengozi.',
  },
  actions: {
    phishing: [
      'Ungacindezeli ilinki kumbe uphendule ngolwazi lwakho.',
      'Ngena kuphela nge-app kumbe iwebhusayithi esemthethweni ovame ukuyisebenzisa.',
      'Nxa usuphe ulwazi, guqula iphasiwedi njalo ufonele ibhanga kumbe umhlinzeki khathesi.',
      'Sula umlayezo.',
    ],
    financial: [
      'Ungathumeli imali, i-PIN yakho kumbe ulwazi lwe-mobile money.',
      'Fonela ibhanga kumbe umhlinzeki we-mobile money enombolweni yabo esemthethweni.',
      'Nxa usuthumele imali, tshela umhlinzeki lamaphoyisa masinyane.',
      'Vimba inombolo le.',
    ],
    identity: [
      'Ungaphi muntu inombolo ye-ID, iphasiwedi kumbe i-OTP.',
      'Xhumana lenhlangano usebenzisa inombolo oyethembayo.',
      'Nxa usuphe ulwazi, guqula amaphasiwedi njalo utshele ibhanga lakho.',
      'Vimba njalo usule umlayezo.',
    ],
    maliciousLink: [
      'Ungavuli ilinki kumbe ifayili enamathiselweyo.',
      'Nxa udinga inkonzo, bhala ikheli lewebhusayithi esemthethweni ngokwakho.',
      'Sula umlayezo.',
    ],
    aiThreat: [
      'Ungenzi okucelwayo okwakhathesi, lanxa ilizwi kumbe ubuso kubonakala kuyiqiniso.',
      'Fonela umuntu lowo enombolweni osulayo.',
      'Landela izinyathelo ezingaphansi ukuqinisekisa isicelo.',
    ],
    benign: [
      'Umlayezo lo ubonakala ujwayelekile. Ungaqhubeka njengokwejwayelekileyo.',
      'Kodwa, ungaphi muntu i-PIN yakho, iphasiwedi kumbe i-OTP.',
    ],
  },
  verifySteps: [
    'Ungaphenduli kumbe ubhadale ngengxoxo kumbe inombolo leyo eyodwa.',
    'Xhumana lomuntu kumbe inhlangano usebenzisa inombolo kumbe iwebhusayithi osulayo.',
    'Buza umbuzo ongaphendulwa ngumuntu weqiniso kuphela, kumbe usebenzise ilizwi eliyimfihlo elivunyelwaneyo.',
    'Kuloba yiphi inkokhelo, vumela omunye umuntu ayivume ungakathumeli.',
    'Nxa ungeke uqinisekise, ungenzi lutho.',
  ],
  report: {
    title: 'Bika umlayezo lo',
    description:
      'Kopa isifinyezo lesi usabelane ngaso lebhanga lakho, inethiwekhi, umqashi kumbe amaphoyisa.',
    header: 'Umbiko we-Chenjera',
    date: 'Usuku lesikhathi',
    channel: 'Wafika nge',
    sender: 'Othumeleyo',
    threat: 'Uhlobo lwengozi',
    risk: 'Izinga lengozi',
    score: 'Amaphuzu engozi',
    message: 'Umlayezo',
    reasons: 'Izizathu',
    copy: 'Kopa umbiko',
    copied: 'Kukopiwe',
    copyFailed: 'Akukopekanga. Khetha umbhalo ukukope.',
    close: 'Vala',
  },
  footer: {
    privacy:
      'I-Chenjera ihlola umbhalo kuphela. Kayivuli amalinki. Umlayezo wakho kawugcinwa.',
    disclaimer: 'Iseluleko lesi siyisikhokelo, hatshi isiqiniseko.',
  },
}

export const translations: Record<Lang, Dictionary> = { en, sn, nd }

/** Replace {phrase} in a reason template. */
export function formatReason(template: string, phrase?: string): string {
  if (!phrase) return template.replace(/\s*\("\{phrase\}"\)/, '')
  return template.replace('{phrase}', phrase)
}
