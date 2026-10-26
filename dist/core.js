export const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseCapture(text,now=new Date()){
 if(typeof text!=='string'||!text.trim())return [];
 const chunks=text.replace(/\r/g,'').split(/\n+|[;!?]+|\.(?:\s+|$)|\b(?:and then|after that|next up)\b/i).map(x=>x.trim()).filter(Boolean);
 if(chunks.length>80)throw new Error('Please split this capture into 80 sentences or fewer. Your draft is kept.');
 return chunks.map(raw=>{
  let date='';const day=new Date(now);if(/\btomorrow\b/i.test(raw)){day.setDate(day.getDate()+1);date=localDate(day);}else if(/\btoday\b|\btonight\b/i.test(raw)){date=localDate(day);}else{const iso=raw.match(/\b(\d{4}-\d{2}-\d{2})\b/);if(iso&&validDate(iso[1]))date=iso[1];}
  const duration=raw.match(/\b(\d{1,3})\s*(?:minutes?|mins?)\b/i);const hours=raw.match(/\b(\d(?:\.\d+)?)\s*hours?\b/i);
  const minutes=duration?Math.max(1,Math.min(240,Number(duration[1]))):hours?Math.min(240,Math.round(Number(hours[1])*60)):25;
  const priority=/\burgent\b|\basap\b|\bhigh priority\b|\bmust\b/i.test(raw)?'high':/\blow priority\b|\bsomeday\b|\bmaybe\b/i.test(raw)?'low':'normal';
  const category=/\b(?:buy|groceries|laundry|home|book|pay|gym|walk)\b/i.test(raw)?'Life':/\b(?:idea|explore|research|brainstorm|learn)\b/i.test(raw)?'Ideas':'Work';
  let title=raw.replace(/^(?:[-•]\s*|\d+[.)]\s+)/,'').replace(/^(?:(?:okay|so|also|then)[,\s]+)*(?:i (?:need to|have to|want to|should|must)|remind me to|please)\s+/i,'').trim();
  title=title?title[0].toUpperCase()+title.slice(1):raw;
  return {id:uid(),title:title.slice(0,500),source:raw.slice(0,2000),minutes,priority,category,due:date,done:false,createdAt:now.toISOString()};
 });
}
export function validDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00');return !Number.isNaN(+d)&&localDate(d)===s;}
export function validateBackup(data){
 if(!data||data.version!==1||!Array.isArray(data.tasks)||data.tasks.length>1000)throw new Error('Choose a valid Unspool backup (up to 1,000 tasks).');
 const ids=new Set();const tasks=data.tasks.map(t=>{if(!t||typeof t.id!=='string'||!t.id||ids.has(t.id)||typeof t.title!=='string'||!t.title.trim()||t.title.length>500||!['Work','Life','Ideas'].includes(t.category)||!['high','normal','low'].includes(t.priority)||!Number.isInteger(t.minutes)||t.minutes<1||t.minutes>240||typeof t.done!=='boolean'||typeof t.due!=='string'||(t.due&&!validDate(t.due)))throw new Error('This backup contains an invalid task. Nothing was changed.');ids.add(t.id);return {id:t.id,title:t.title,source:typeof t.source==='string'?t.source.slice(0,2000):'',category:t.category,priority:t.priority,minutes:t.minutes,done:t.done,due:t.due,createdAt:typeof t.createdAt==='string'?t.createdAt:''};});
 return {version:1,tasks,draft:typeof data.draft==='string'?data.draft.slice(0,12000):'',isSample:!!data.isSample};
}
export function orderedTasks(tasks){const rank={high:0,normal:1,low:2};return [...tasks].sort((a,b)=>Number(a.done)-Number(b.done)||rank[a.priority]-rank[b.priority]||(a.due||'9999').localeCompare(b.due||'9999'));}
export function markdown(tasks){return '# My Unspool plan\n\n'+tasks.map(t=>`- [${t.done?'x':' '}] ${t.title.replace(/[\r\n]/g,' ')} · ${t.minutes} min · ${t.category} · ${t.priority} priority${t.due?' · due '+t.due:''}`).join('\n')+'\n';}
