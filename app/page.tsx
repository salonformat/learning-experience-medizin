'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Volume2, VolumeX, X } from 'lucide-react';

type Option = { label: string; feedback: string; correct?: boolean };
type FlipCard = { front: string; back: string };
type Screen = {
  eyebrow?: string; kicker?: string; title?: string; body?: string; quote?: string;
  tone?: 'paper' | 'red' | 'ink' | 'lime' | 'sage'; illustration?: string; index?: string;
  options?: Option[]; cards?: FlipCard[]; required?: boolean; strategy?: string; action?: string;
};

const screensEn: Screen[] = [
  {},
  { eyebrow: 'Your learning goal', kicker: '09:50 / Before the course', title: 'Leave with a way to begin — even when you feel unsure.', body: 'In the next ten minutes, you will practise three moves: orient yourself, choose a manageable level of participation and make a personal start plan.', strategy: '01 — Notice what you need\n02 — Choose how to enter\n03 — Decide what to do next', tone: 'paper' },
  { eyebrow: 'Three moves / Discover', kicker: '09:51 / Turn all three cards', title: 'A practical way into practice.', body: 'Turn each card to learn the three moves. You will apply them in the next screens.', required: true, tone: 'ink', cards: [
    { front: 'ORIENT', back: 'Find out what happens first, how practice works and where help is available.' },
    { front: 'DOSE', back: 'Choose the smallest form of participation that still lets you practise.' },
    { front: 'REVIEW', back: 'Use specific feedback to decide exactly what to try next.' },
  ]},
  { eyebrow: 'Professional learning', kicker: '09:52 / Standards and support', title: 'High standards need a safe place to practise.', body: 'Precision matters. So does a learning environment where observing, asking and repeating are explicitly part of the process.', strategy:'CLEAR STANDARD\nSAFE PRACTICE', illustration: 'door', tone: 'sage' },
  { eyebrow: 'Move 01 / Orient yourself', kicker: '09:53 / Turn all three cards', title: 'Look for three cues before you begin.', body: 'Each cue answers a concrete question. Turn the cards to reveal it.', required: true, tone: 'ink', cards: [
    { front: 'SEQUENCE', back: 'What happens first — and what follows?' },
    { front: 'FORMAT', back: 'Will I watch, work in pairs or practise with the group?' },
    { front: 'SUPPORT', back: 'How can I pause, ask a question or request another demonstration?' },
  ]},
  { eyebrow: 'Check your understanding', kicker: '09:54 / Retrieval 01', title: 'Why does orientation help?', required: true, tone: 'lime', options: [
    { label: 'It removes every uncomfortable feeling.', feedback: 'Not quite. The goal is not to remove every feeling; it is to make the next step clearer.' },
    { label: 'It makes expectations and options visible.', feedback: 'Exactly. Clarity frees attention for learning instead of guessing.', correct: true },
    { label: 'It lets you avoid participating.', feedback: 'Not quite. Orientation supports participation; it does not replace it.' },
  ]},
  { eyebrow: 'Move 02 / Dose participation', kicker: '09:55 / Choose an entry point', title: 'Participation is not all or nothing.', body: 'A useful first step is challenging enough to involve you, but small enough to attempt.', strategy: 'WATCH → TRY WITH ONE PERSON → TRY WITH THE GROUP', tone: 'paper' },
  { eyebrow: 'Apply the move', kicker: '09:56 / A real choice', title: 'The trainer asks: “Who wants to try first?”', body: 'You want to participate, but you are not ready to demonstrate in front of the group. What is the best next step?', required: true, tone: 'red', options: [
    { label: 'Say nothing and mentally leave the exercise.', feedback: 'This protects you from exposure, but also removes the opportunity to learn. Look for a smaller form of participation.' },
    { label: 'Ask to watch once, then practise with a partner.', feedback: 'Good choice. You stay involved while lowering the social risk of the first attempt.', correct: true },
    { label: 'Volunteer immediately, although you cannot focus.', feedback: 'More exposure is not automatically more learning. Choose a level at which you can still pay attention.' },
  ], illustration: 'chairs' },
  { eyebrow: 'What you just did', kicker: '09:57 / Deliberate participation', title: 'You adjusted the step — not the goal.', body: 'Watching once and practising with one person still moves toward participation. The route became manageable.', quote: 'Small enough to start. Real enough to learn.', tone: 'paper' },
  { eyebrow: 'Move 03 / Use feedback', kicker: '09:58 / Turn both cards', title: 'Useful feedback has two parts.', body: 'Turn both cards. The next screen asks you to recognise the complete pattern.', required: true, tone: 'lime', cards: [
    { front: 'KEEP', back: 'Name one observable action that already worked.' },
    { front: 'NEXT', back: 'Name one specific action to try in the next attempt.' },
  ]},
  { eyebrow: 'Choose the useful feedback', kicker: '09:58 / Retrieval 02', title: 'Which sentence best supports another attempt?', required: true, tone: 'ink', options: [
    { label: '“That was not very confident.”', feedback: 'This judges the person and gives no usable next step.' },
    { label: '“Good job.”', feedback: 'Kind, but too general. The learner cannot tell what to repeat.' },
    { label: '“Keep your clear opening. Then slow down for the next step.”', feedback: 'Yes. It names what worked and gives one specific next action.', correct: true },
  ]},
  { eyebrow: 'Apply all three moves', kicker: '09:59 / New situation', title: 'You missed the demonstration and the group is already practising.', body: 'Which response uses the complete strategy?', required: true, tone: 'sage', options: [
    { label: 'Wait quietly and copy whatever the person beside you does.', feedback: 'Not yet. This skips orientation and gives you no reliable next step.' },
    { label: 'Ask what you missed, watch once, then try with a partner and request one specific correction.', feedback: 'Correct. You orient, choose a manageable entry level and use feedback.', correct: true },
    { label: 'Join immediately and hope the sequence becomes clear.', feedback: 'Not yet. Starting without orientation adds avoidable uncertainty.' },
  ]},
  { eyebrow: 'Complete the plan', kicker: '09:59 / Then…', title: 'After asking, what will you do?', required: true, tone: 'sage', options: [
    { label: 'Wait until I feel completely confident.', feedback: 'Complete confidence may never arrive before practice. Choose a small action instead.' },
    { label: 'Take one manageable attempt and review it.', feedback: 'Exactly. A small attempt creates real information for the next one.', correct: true },
    { label: 'Compare myself with the fastest person.', feedback: 'Comparison adds pressure but gives you little guidance for your own next step.' },
  ]},
  { eyebrow: 'Put it in order', kicker: '10:00 / Retrieval 03', title: 'Which sequence can you use next time?', required: true, tone: 'lime', options: [
    { label: 'Perform → compare → hope', feedback: 'This sequence increases pressure without creating a usable next step.' },
    { label: 'Orient → choose a level → try → use feedback', feedback: 'Correct. This is your reusable entry sequence.', correct: true },
    { label: 'Wait → feel ready → begin perfectly', feedback: 'Learning usually creates readiness; it does not need to wait for it.' },
  ]},
  { eyebrow: 'Your takeaway', kicker: '10:00 / The course begins', title: 'You do not need to feel fearless to begin.', body: 'Make the situation clear. Choose a manageable level of participation. Use feedback to decide what comes next.', strategy: 'ORIENT\nDOSE\nTRY AGAIN', index: '03', tone: 'ink' },
  { eyebrow: 'End / A beginning', kicker: 'A learning experience by Salon Format', title: 'Ready enough is a real learning outcome.', body: 'You arrived with a question. You leave with a sequence you can use.', action: 'Experience again', tone: 'paper' },
];

const screensDe: Screen[] = [
  {},
  { eyebrow:'Dein Lernziel', kicker:'09:50 / Vor Kursbeginn', title:'Am Ende weißt du, wie du anfangen kannst – auch wenn du unsicher bist.', body:'In den nächsten zehn Minuten übst du drei Schritte: Orientierung finden, einen machbaren Einstieg wählen und den nächsten Versuch planen.', strategy:'01 — Orientierung finden\n02 — Einstieg wählen\n03 — Nächsten Versuch planen', tone:'paper' },
  { eyebrow:'Drei Schritte / Entdecken', kicker:'09:51 / Dreh alle drei Karten um', title:'So findest du ins praktische Üben.', body:'Dreh alle Karten um und lerne die drei Schritte kennen. Auf den nächsten Screens wendest du sie an.', required:true, tone:'ink', cards:[
    { front:'ORIENTIEREN', back:'Kläre, was zuerst passiert, wie geübt wird und wo du Unterstützung bekommst.' },
    { front:'DOSIEREN', back:'Wähle die kleinste Form der Beteiligung, bei der du noch wirklich übst.' },
    { front:'AUSWERTEN', back:'Nutze konkretes Feedback, um deinen nächsten Versuch zu planen.' },
  ]},
  { eyebrow:'Professionelles Lernen', kicker:'09:52 / Anspruch und Unterstützung', title:'Hohe Standards brauchen einen sicheren Übungsraum.', body:'Präzision zählt. Genauso wichtig ist eine Lernumgebung, in der Zuschauen, Nachfragen und Wiederholen ausdrücklich zum Prozess gehören.', strategy:'KLARER STANDARD\nSICHERER ÜBUNGSRAUM', illustration:'door', tone:'sage' },
  { eyebrow:'Schritt 01 / Orientieren', kicker:'09:53 / Dreh alle drei Karten um', title:'Achte vor dem Start auf drei Hinweise.', body:'Jeder Hinweis beantwortet eine konkrete Frage. Dreh die Karten um.', required:true, tone:'ink', cards:[
    { front:'ABLAUF', back:'Was passiert zuerst – und was kommt danach?' },
    { front:'FORMAT', back:'Schaue ich zuerst zu, übe ich zu zweit oder in der Gruppe?' },
    { front:'UNTERSTÜTZUNG', back:'Wie kann ich pausieren, nachfragen oder um eine weitere Demonstration bitten?' },
  ]},
  { eyebrow:'Wissen überprüfen', kicker:'09:54 / Abruf 01', title:'Warum hilft Orientierung?', required:true, tone:'lime', options:[
    { label:'Sie nimmt jedes unangenehme Gefühl weg.', feedback:'Noch nicht. Es geht nicht darum, jedes Gefühl zu beseitigen. Der nächste Schritt soll klarer werden.' },
    { label:'Sie macht Erwartungen und Möglichkeiten sichtbar.', feedback:'Genau. Wer weniger raten muss, hat mehr Aufmerksamkeit für das Lernen.', correct:true },
    { label:'Sie ermöglicht es, jede Beteiligung zu vermeiden.', feedback:'Noch nicht. Orientierung unterstützt die Beteiligung, sie ersetzt sie nicht.' },
  ]},
  { eyebrow:'Schritt 02 / Beteiligung dosieren', kicker:'09:55 / Einstieg wählen', title:'Beteiligung ist nicht alles oder nichts.', body:'Ein guter erster Schritt fordert dich genug, um zu lernen – und ist klein genug, um ihn tatsächlich zu versuchen.', strategy:'ZUSCHAUEN → ZU ZWEIT ÜBEN → IN DER GRUPPE ÜBEN', tone:'paper' },
  { eyebrow:'Schritt anwenden', kicker:'09:56 / Eine konkrete Entscheidung', title:'Die Kursleitung fragt: „Wer möchte anfangen?“', body:'Du willst mitmachen, aber noch nicht vor der ganzen Gruppe demonstrieren. Was ist der beste nächste Schritt?', required:true, tone:'red', options:[
    { label:'Nichts sagen und innerlich aus der Übung aussteigen.', feedback:'So vermeidest du zwar Aufmerksamkeit, aber auch die Lernmöglichkeit. Suche eine kleinere Form der Beteiligung.' },
    { label:'Bitten, einmal zuzusehen und danach zu zweit zu üben.', feedback:'Richtig. Du bleibst beteiligt und verringerst gleichzeitig den sozialen Druck beim ersten Versuch.', correct:true },
    { label:'Sofort beginnen, obwohl du dich nicht konzentrieren kannst.', feedback:'Mehr Sichtbarkeit bedeutet nicht automatisch mehr Lernen. Wähle eine Stufe, auf der du noch aufmerksam bleiben kannst.' },
  ], illustration:'chairs' },
  { eyebrow:'Was du gerade gemacht hast', kicker:'09:57 / Bewusst beteiligen', title:'Du hast den Schritt angepasst – nicht das Ziel.', body:'Einmal zusehen und danach zu zweit üben führt weiterhin zur Beteiligung. Der Weg dorthin ist nur machbarer geworden.', quote:'Klein genug, um anzufangen. Echt genug, um zu lernen.', tone:'paper' },
  { eyebrow:'Schritt 03 / Feedback nutzen', kicker:'09:58 / Dreh beide Karten um', title:'Nützliches Feedback besteht aus zwei Teilen.', body:'Dreh beide Karten um. Auf dem nächsten Screen erkennst du das vollständige Muster wieder.', required:true, tone:'lime', cards:[
    { front:'BEIBEHALTEN', back:'Benenne eine beobachtbare Handlung, die bereits funktioniert hat.' },
    { front:'ALS NÄCHSTES', back:'Benenne eine konkrete Handlung für den nächsten Versuch.' },
  ]},
  { eyebrow:'Nützliches Feedback erkennen', kicker:'09:58 / Abruf 02', title:'Welche Rückmeldung unterstützt einen weiteren Versuch?', required:true, tone:'ink', options:[
    { label:'„Das war nicht besonders sicher.“', feedback:'Diese Aussage bewertet die Person und bietet keinen brauchbaren nächsten Schritt.' },
    { label:'„Gut gemacht.“', feedback:'Freundlich, aber zu allgemein. Es bleibt unklar, was beibehalten werden soll.' },
    { label:'„Behalte deinen klaren Einstieg bei. Mach den nächsten Schritt etwas langsamer.“', feedback:'Richtig. Die Rückmeldung benennt, was funktioniert hat, und gibt eine konkrete nächste Handlung.', correct:true },
  ]},
  { eyebrow:'Alle drei Schritte anwenden', kicker:'09:59 / Neue Situation', title:'Du hast die Demonstration verpasst. Die Gruppe übt bereits.', body:'Welche Reaktion nutzt die vollständige Strategie?', required:true, tone:'sage', options:[
    { label:'Warten und einfach nachmachen, was die Person neben dir tut.', feedback:'Noch nicht. Dabei fehlen Orientierung und ein verlässlicher nächster Schritt.' },
    { label:'Nachfragen, einmal zusehen, zu zweit beginnen und um eine konkrete Korrektur bitten.', feedback:'Richtig. Du orientierst dich, wählst einen machbaren Einstieg und nutzt Feedback.', correct:true },
    { label:'Sofort einsteigen und hoffen, dass der Ablauf klar wird.', feedback:'Noch nicht. Ohne Orientierung entsteht vermeidbare Unsicherheit.' },
  ]},
  { eyebrow:'Den Plan vervollständigen', kicker:'09:59 / Danach …', title:'Was tust du nach dem Nachfragen?', required:true, tone:'sage', options:[
    { label:'Warten, bis du dich vollkommen sicher fühlst.', feedback:'Vollständige Sicherheit entsteht oft erst durch Übung. Wähle stattdessen eine kleine Handlung.' },
    { label:'Einen machbaren Versuch starten und danach auswerten.', feedback:'Richtig. Ein kleiner Versuch liefert konkrete Informationen für den nächsten.', correct:true },
    { label:'Dich mit der schnellsten Person im Raum vergleichen.', feedback:'Der Vergleich erhöht den Druck, hilft dir aber kaum bei deinem eigenen nächsten Schritt.' },
  ]},
  { eyebrow:'In die richtige Reihenfolge bringen', kicker:'10:00 / Abruf 03', title:'Welche Abfolge kannst du beim nächsten Mal nutzen?', required:true, tone:'lime', options:[
    { label:'Leisten → vergleichen → hoffen', feedback:'Diese Abfolge erzeugt Druck, aber keinen brauchbaren nächsten Schritt.' },
    { label:'Orientieren → Einstieg wählen → versuchen → Feedback nutzen', feedback:'Richtig. Das ist deine wiederverwendbare Einstiegsstrategie.', correct:true },
    { label:'Warten → bereit fühlen → perfekt beginnen', feedback:'Bereitschaft entsteht häufig durch das Lernen. Sie muss nicht vollständig davor da sein.' },
  ]},
  { eyebrow:'Das nimmst du mit', kicker:'10:00 / Der Kurs beginnt', title:'Du musst nicht furchtlos sein, um anzufangen.', body:'Mach dir die Situation klar. Wähle eine machbare Form der Beteiligung. Nutze Feedback für deinen nächsten Versuch.', strategy:'ORIENTIEREN\nDOSIEREN\nERNEUT VERSUCHEN', index:'03', tone:'ink' },
  { eyebrow:'Ende / Ein Anfang', kicker:'Eine Lernerfahrung von Salon Format', title:'Bereit genug ist ein echtes Lernergebnis.', body:'Du bist mit einer Frage gekommen. Du gehst mit einer Strategie, die du wiederverwenden kannst.', action:'Noch einmal erleben', tone:'paper' },
];

const audioTracksEn: Record<number, string> = {
  0:'/audio/screen-00.mp3', 1:'/audio/screen-01.mp3', 2:'/audio/screen-02.mp3',
  3:'/audio/screen-03.mp3', 4:'/audio/screen-04.mp3', 5:'/audio/screen-05.mp3',
  6:'/audio/screen-06.mp3', 7:'/audio/screen-07.mp3', 9:'/audio/screen-09.mp3',
  10:'/audio/screen-10.mp3', 11:'/audio/screen-11.mp3', 13:'/audio/screen-13.mp3',
  14:'/audio/screen-14.mp3', 15:'/audio/screen-15.mp3',
};
const audioTracksDe: Record<number, string> = Object.fromEntries([0,1,2,3,4,5,6,7,9,10,11,13,14,15].map(index => [index, `/audio/de-screen-${String(index).padStart(2,'0')}.mp3`]));

export default function Home() {
  const [language, setLanguage] = useState<'en'|'de'>('en');
  const [current, setCurrent] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [flipped, setFlipped] = useState<Record<number, number[]>>({});
  const screens = language === 'de' ? screensDe : screensEn;
  const de = language === 'de';
  const screen = screens[current];
  const selected = answers[current] ?? [];
  const turned = flipped[current] ?? [];
  const selectedOption = screen.options?.find(option => selected.includes(option.label));
  const complete = !screen.required || (screen.cards ? turned.length === screen.cards.length : screen.options?.some(option => option.correct) ? selectedOption?.correct === true : selected.length > 0);
  const choose = (label: string) => setAnswers(previous => ({ ...previous, [current]: [label] }));
  const flip = (index: number) => setFlipped(previous => ({ ...previous, [current]: [...new Set([...(previous[current] ?? []), index])] }));
  const next = () => complete && setCurrent(value => Math.min(value + 1, screens.length - 1));
  const previous = () => setCurrent(value => Math.max(value - 1, 0));
  const changeLanguage = (value:'en'|'de') => { setLanguage(value); setCurrent(0); setAnswers({}); setFlipped({}); };

  useEffect(() => {
    const track = language === 'de' ? audioTracksDe[current] : audioTracksEn[current];
    if (!soundOn || !track) return;
    const audio = new Audio(track);
    audio.volume = .9;
    void audio.play().catch(() => undefined);
    return () => { audio.pause(); audio.currentTime = 0; };
  }, [current, soundOn, language]);

  return <main className={`course-shell lang-${language} tone-${screen.tone ?? 'paper'}`}>
    <a className="skip-link" href="#screen-title">{de?'Zum Kursinhalt springen':'Skip to lesson'}</a>
    <Header current={current} soundOn={soundOn} setSoundOn={setSoundOn} language={language} setLanguage={changeLanguage} />
    {current === 0 ? <Cover language={language} /> : <section className="lesson-stage" aria-live="polite">
      <div className={`lesson-copy ${screen.cards ? 'has-cards' : ''} ${screen.options ? 'has-choices' : ''}`}>
        <p className="course-type">{screen.eyebrow}</p>
        <h1 id="screen-title">{screen.title}</h1>
        {screen.quote && <p className="pull-quote">{screen.quote}</p>}
        {screen.body && <p className="lesson-body">{screen.body}</p>}
        {screen.strategy && <div className="strategy-strip">{screen.strategy.split('\n').map(line => <span key={line}>{line}</span>)}</div>}
        {screen.cards && <div className={`flip-grid cards-${screen.cards.length}`}>{screen.cards.map((card,index) => {
          const isFlipped = turned.includes(index);
          return <button className={`flip-card ${isFlipped ? 'is-flipped' : ''}`} key={card.front} onClick={() => flip(index)} aria-label={`${card.front}: ${isFlipped ? card.back : de?'Karte umdrehen':'turn card'}`}><span className="flip-card-inner"><span className="flip-front"><small>{de?'Zum Umdrehen tippen':'Tap to reveal'}</small><strong>{card.front}</strong><i>↗</i></span><span className="flip-back"><small>{String(index+1).padStart(2,'0')}</small><strong>{card.back}</strong><Check /></span></span></button>;
        })}</div>}
        {screen.options && <div className="choice-list">{screen.options.map(option => {
          const active = selected.includes(option.label);
          return <button className={active ? `selected ${option.correct ? 'correct-choice' : 'wrong-choice'}` : ''} key={option.label} onClick={() => choose(option.label)}><span>{option.label}</span>{active && (option.correct ? <Check /> : <X />)}</button>;
        })}</div>}
        {selectedOption && <div className={`learning-feedback ${selectedOption.correct ? 'correct' : 'incorrect'}`}><strong>{selectedOption.correct ? (de?'Richtig.':'Correct.') : (de?'Noch nicht.':'Not yet.')}</strong><p>{selectedOption.feedback}</p></div>}
        {screen.action && <button className="inline-action" onClick={() => { setCurrent(0); setAnswers({}); setFlipped({}); }}>{screen.action}<ArrowRight /></button>}
      </div>
      <aside className="lesson-aside"><p className="time-code">{screen.kicker}</p>{screen.illustration ? <ObjectIllustration kind={screen.illustration} language={language} /> : screen.strategy ? <StrategyDiagram lines={screen.strategy.split('\n')} /> : screen.index ? <strong className="design-index">{screen.index}</strong> : <MinuteMark minute={Math.min(10, current - 1)} />}</aside>
    </section>}
    <Navigation current={current} previous={previous} next={next} complete={complete} language={language} pendingLabel={screen.cards ? (language==='de'?'Alle Karten umdrehen':'Turn all cards') : (language==='de'?'Antwort auswählen':'Choose an answer')} />
  </main>;
}

function Header({ current, soundOn, setSoundOn, language, setLanguage }: { current:number; soundOn:boolean; setSoundOn:(value:boolean)=>void; language:'en'|'de'; setLanguage:(value:'en'|'de')=>void }) { const de=language==='de'; return <header className="topbar"><a className="salon-mark" href="https://salonformat.com/"><span>SALON</span><span>FORMAT</span></a><a className="back-link" href="https://salonformat.com/#projects"><ArrowLeft /> {de?'Alle Projekte':'All projects'}</a><div className="top-actions"><div className="language-toggle"><button className={de?'active':''} onClick={()=>setLanguage('de')}>DE</button><span>/</span><button className={!de?'active':''} onClick={()=>setLanguage('en')}>EN</button></div><button className="sound-toggle" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? (de?'Voice-over ausschalten':'Turn voice-over off') : (de?'Voice-over einschalten':'Turn voice-over on')} title={soundOn ? (de?'Voice-over an':'Voice-over on') : (de?'Voice-over aus':'Voice-over off')}>{soundOn ? <Volume2/> : <VolumeX/>}</button><span className="page-number">{String(current + 1).padStart(2,'0')} / 16</span></div></header>; }
function Cover({language}:{language:'en'|'de'}) { const de=language==='de'; return <section className="editorial-stage"><div className="title-column"><p className="course-type">{de?'Interaktive Lernerfahrung':'Interactive learning experience'}</p><h1 id="screen-title">{de?<><span>Was, wenn ich</span><br/><em>etwas falsch mache?</em></>:<>What if I<br/>get it <em>wrong?</em></>}</h1><div className="title-rule"/><p className="subtitle">{de?'Die ersten zehn Minuten eines Erste-Hilfe-Kurses.':'The first ten minutes of a first-aid course.'}</p><p className="intro">{de?'Eine kurze Lernerfahrung darüber, wie Unsicherheit entsteht – und was den ersten Schritt erleichtert.':'A short exploration of uncertainty, practice and what helps someone take the first step.'}</p></div><aside className="time-panel"><div className="panel-label"><span/> {de?'Bevor der Kurs beginnt':'Before the course begins'}</div><div className="timer-figure"><svg viewBox="0 0 240 240"><circle className="timer-track" cx="120" cy="120" r="102"/><circle className="timer-progress" cx="120" cy="120" r="102"/></svg><div className="timer-copy"><strong>10:00</strong><span>{de?'Minuten':'minutes'}</span></div></div><p className="panel-note">{de?<>Der Kurs hat noch nicht begonnen.<br/>Die Lernerfahrung schon.</>:<>The course has not started.<br/>The learning experience has.</>}</p></aside></section>; }
function MinuteMark({ minute }: { minute:number }) { return <div className="minute-mark"><span>{String(Math.max(0,minute)).padStart(2,'0')}</span><small>MIN</small></div>; }
function StrategyDiagram({ lines }: { lines:string[] }) { return <div className="strategy-diagram">{lines.map((line,index)=><div key={line}><span>{String(index+1).padStart(2,'0')}</span><p>{line.replace(/^\d+\s*[—-]\s*/, '')}</p></div>)}</div>; }
function ObjectIllustration({ kind, language }: { kind:string; language:'en'|'de' }) {
  const de=language==='de';
  if (kind === 'door') return <svg className="object-illustration door-drawing" viewBox="0 0 360 360" aria-label={de?'Eine halb geöffnete Kursraumtür':'A half-open course-room door'}><path d="M86 306V55h166v251M109 284l104 24V79l-104 24z"/><circle cx="194" cy="196" r="5"/><path className="accent-stroke" d="M232 111h61v165h-61M251 241h25"/><path className="solid-accent" d="M52 286h70v20H52z"/></svg>;
  if (kind === 'room') return <svg className="object-illustration" viewBox="0 0 360 360" aria-label={de?'Ein Stuhl, eine Matte und eine Kurstasche':'A chair, mat and course bag'}><path d="M63 128h88v75H63zM74 203v73m66-73v73M86 102h42v26"/><path className="accent-stroke" d="M182 252l107-25 12 52-107 25z"/><path d="M221 126h65l12 76h-89zM236 126v-20h35v20"/><circle className="solid-accent" cx="95" cy="164" r="13"/></svg>;
  if (kind === 'chairs') return <svg className="object-illustration" viewBox="0 0 360 360" aria-label={de?'Zwei einander zugewandte Stühle':'Two chairs facing one another'}><path d="M50 124h94v84H50zM65 208v69m64-69v69M216 124h94v84h-94zM231 208v69m64-69v69"/><path className="accent-stroke" d="M164 165h32m-18-14 18 14-18 14"/><circle className="solid-accent" cx="97" cy="166" r="11"/><circle className="solid-accent" cx="263" cy="166" r="11"/></svg>;
  return <svg className="object-illustration" viewBox="0 0 360 360" aria-label={de?'Zwei Feedbackkarten':'Two feedback note cards'}><path d="M72 91h181v178H72zM108 135h111M108 168h86M108 201h101"/><path className="accent-stroke" d="M131 126h164v162H131"/><circle className="solid-accent" cx="251" cy="246" r="22"/><path className="cutout-stroke" d="m241 246 7 7 14-16"/></svg>;
}
function Navigation({ current, previous, next, complete, pendingLabel, language }: { current:number; previous:()=>void; next:()=>void; complete:boolean; pendingLabel:string; language:'en'|'de' }) { const de=language==='de'; return <footer className="bottom-bar"><p>{de?'Salon Format / Lernen durch Design, Geschichten und Spiel.':'Salon Format / Learning through design, story and play.'}</p><div className="nav-buttons">{current>0&&<button className="nav-previous" onClick={previous} aria-label={de?'Vorheriger Screen':'Previous screen'}><ArrowLeft/></button>}{current<15&&<button className="begin-button" onClick={next} disabled={!complete}>{current===0?(de?'Starten':'Begin the experience'):complete?(de?'Weiter':'Continue'):pendingLabel}<ArrowRight/></button>}</div><div className="progress-line"><span style={{width:`${((current+1)/16)*100}%`}}/></div></footer>; }
