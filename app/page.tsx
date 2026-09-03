'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Volume2, VolumeX } from 'lucide-react';

const screens = [
  { type: 'cover' },
  { kicker: '09:50 / Arrival', eyebrow: 'Ten minutes before the course', title: 'You are early.\nSo is the doubt.', body: 'The room is ready. The people are not — not quite.', aside: 'A course begins before anyone starts teaching.', tone: 'paper' },
  { kicker: '09:51 / A thought appears', eyebrow: 'Choose the thought that feels familiar', title: 'What if everyone else already knows?', choices: ['I will be the slowest person here.', 'I might freeze when it matters.', 'I do not want to look foolish.'], tone: 'red' },
  { kicker: '09:52 / Look around', eyebrow: 'Nothing is happening yet', title: 'A chair. A mat.\nA bag by the door.', body: 'Ordinary objects. But uncertainty can make a room feel like a test.', aside: 'Tap each word. Name the room before it names you.', objects: ['chair', 'mat', 'door', 'bag'], tone: 'ink' },
  { kicker: '09:53 / Reframe', eyebrow: 'One sentence changes the room', quote: '“You are not here to perform. You are here to practise.”', body: 'The task has not changed. The meaning of the task has.', tone: 'lime' },
  { kicker: '09:54 / Permission', eyebrow: 'A good beginning makes space', title: 'You may pause.\nYou may ask.\nYou may try again.', body: 'Confidence is not the entry requirement. It can be an outcome.', tone: 'paper' },
  { kicker: '09:55 / Your move', eyebrow: 'Choose a first step', title: 'What would make starting easier?', choices: ['Watch once before trying.', 'Try with someone beside me.', 'Ask one question first.'], tone: 'red' },
  { kicker: '09:56 / Pair up', eyebrow: 'The room becomes smaller', title: 'Not in front of everyone.\nWith one other person.', body: 'A smaller social risk can create more room for attention, curiosity and practice.', aside: 'Design the conditions, not the courage.', tone: 'paper' },
  { kicker: '09:57 / First attempt', eyebrow: 'No score. No spotlight.', title: 'Ready does not have to mean certain.', body: 'It can simply mean: willing to begin.', action: 'I am willing to begin', tone: 'ink' },
  { kicker: '09:58 / Feedback', eyebrow: 'Specific. Kind. Useful.', quote: '“Keep that part. Try this part once more.”', body: 'Feedback points forward. It does not turn the learner into the mistake.', tone: 'lime' },
  { kicker: '09:59 / Again', eyebrow: 'Practice changes the question', title: 'From “What if I get it wrong?”\nto “What will I try next?”', body: 'The shift is small. The learning is not.', tone: 'paper' },
  { kicker: '10:00 / The course begins', eyebrow: 'Ten minutes have passed', title: 'You did not become fearless.', body: 'You became ready enough to participate.', aside: 'That is a meaningful learning outcome.', tone: 'red' },
  { kicker: 'Pause / Look back', eyebrow: 'What changed?', title: 'The learner was never the problem.', body: 'The environment changed: less performance, more permission; less exposure, more practice.', tone: 'paper' },
  { kicker: 'Design note 01', eyebrow: 'Before information comes orientation', title: 'Make the unknown visible.', body: 'Show the room, the rhythm and what participation will feel like.', index: '01', tone: 'ink' },
  { kicker: 'Design note 02', eyebrow: 'Before confidence comes permission', title: 'Lower the social risk.', body: 'Let people observe, choose, pause and repeat without turning practice into performance.', index: '02', tone: 'lime' },
  { kicker: 'End / A beginning', eyebrow: 'What if I get it wrong?', title: 'A learning experience about the moment before learning starts.', body: 'Concept, narrative and experience design by Salon Format.', action: 'Experience again', tone: 'paper' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [answer, setAnswer] = useState<Record<number, string>>({});
  const [seenObjects, setSeenObjects] = useState<string[]>([]);
  const screen = screens[current];
  const next = () => setCurrent((value) => Math.min(value + 1, screens.length - 1));
  const previous = () => setCurrent((value) => Math.max(value - 1, 0));
  return <main className={`course-shell tone-${screen.tone ?? 'paper'}`}>
    <a className="skip-link" href="#screen-title">Skip to lesson</a>
    <Header current={current} soundOn={soundOn} setSoundOn={setSoundOn} />
    {current === 0 ? <Cover /> : <section className="lesson-stage" aria-live="polite">
      <div className="lesson-copy">
        <p className="course-type">{screen.eyebrow}</p>
        {screen.quote ? <blockquote id="screen-title">{screen.quote}</blockquote> : <h1 id="screen-title">{screen.title?.split('\n').map((line, index, all) => <span key={line}>{line}{index < all.length - 1 && <br />}</span>)}</h1>}
        {screen.body && <p className="lesson-body">{screen.body}</p>}
        {screen.choices && <div className="choice-list">{screen.choices.map((choice) => <button className={answer[current] === choice ? 'selected' : ''} key={choice} onClick={() => setAnswer({ ...answer, [current]: choice })}><span>{choice}</span>{answer[current] === choice && <Check />}</button>)}</div>}
        {screen.objects && <div className="object-list">{screen.objects.map((object) => <button className={seenObjects.includes(object) ? 'seen' : ''} key={object} onClick={() => setSeenObjects([...new Set([...seenObjects, object])])}>{object}</button>)}</div>}
        {screen.action && <button className="inline-action" onClick={current === screens.length - 1 ? () => setCurrent(0) : next}>{screen.action}<ArrowRight /></button>}
      </div>
      <aside className="lesson-aside"><p className="time-code">{screen.kicker}</p>{screen.index ? <strong className="design-index">{screen.index}</strong> : <MinuteMark minute={current < 12 ? current - 1 : 10} />}{screen.aside && <p className="aside-note">{screen.aside}</p>}</aside>
    </section>}
    <Navigation current={current} previous={previous} next={next} />
  </main>;
}

function Header({ current, soundOn, setSoundOn }: { current:number; soundOn:boolean; setSoundOn:(value:boolean)=>void }) {
  return <header className="topbar"><a className="salon-mark" href="https://salonformat.com/" aria-label="Salon Format home"><span>SALON</span><span>FORMAT</span></a><a className="back-link" href="https://salonformat.com/#projects"><ArrowLeft /> All projects</a><div className="top-actions"><button className="sound-toggle" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}>{soundOn ? <Volume2 /> : <VolumeX />}</button><span className="page-number">{String(current + 1).padStart(2,'0')} / 16</span></div></header>;
}
function Cover() {
  return <section className="editorial-stage"><div className="title-column"><p className="course-type">Interactive learning experience</p><h1 id="screen-title">What if I<br />get it <em>wrong?</em></h1><div className="title-rule"/><p className="subtitle">The first ten minutes of a first-aid course.</p><p className="intro">A short exploration of uncertainty, practice and what helps someone take the first step.</p></div><aside className="time-panel"><div className="panel-label"><span/> Before the course begins</div><div className="timer-figure"><svg viewBox="0 0 240 240"><circle className="timer-track" cx="120" cy="120" r="102"/><circle className="timer-progress" cx="120" cy="120" r="102"/></svg><div className="timer-copy"><strong>10:00</strong><span>minutes</span></div></div><p className="panel-note">The course has not started.<br/>The learning experience has.</p></aside></section>;
}
function MinuteMark({ minute }: { minute:number }) { return <div className="minute-mark"><span>{String(Math.max(0,minute)).padStart(2,'0')}</span><small>MIN</small></div>; }
function Navigation({ current, previous, next }: { current:number; previous:()=>void; next:()=>void }) {
  return <footer className="bottom-bar"><p>Salon Format / Learning through design, story and play.</p><div className="nav-buttons">{current > 0 && <button className="nav-previous" onClick={previous} aria-label="Previous screen"><ArrowLeft /></button>}{current === 0 ? <button className="begin-button" onClick={next}>Begin the experience <ArrowRight /></button> : current < 15 && <button className="begin-button" onClick={next}>Continue <ArrowRight /></button>}</div><div className="progress-line"><span style={{width:`${((current+1)/16)*100}%`}}/></div></footer>;
}
