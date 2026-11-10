const scenarios = {
  patrol: {label:'Safe patrol', color:'#4fa673', sensor:'No hazard signal', action:'Green LEDs · Cruise at speed 45 · Pivot if an obstacle is within 12 inches', explanation:'The robot keeps moving while the camera, front range sensor, and floor sensor feed the control loop.'},
  smoke: {label:'Smoke warning', color:'#e6a73b', sensor:'Camera haze or optical return change', action:'Amber LEDs · White headlights · Slow to speed 25', explanation:'A smoke indication moves the robot into a cautious investigation state.'},
  fire: {label:'Fire alarm', color:'#e45f4c', sensor:'Camera flame region', action:'Immediate motor brake · Flashing red LEDs · 12-inch programmed standoff', explanation:'Flame detection takes priority over smoke warning and stops forward motion.'},
  floor: {label:'Floor hazard', color:'#ad423b', sensor:'Red boundary or very dark floor', action:'Reverse for 0.8 seconds · Stop', explanation:'The floor warning has the highest priority in the supplied control logic.'}
};
const buttons = document.querySelectorAll('[data-scenario]');
const display = document.querySelector('#scenario-result');
function selectScenario(key) {
  const item = scenarios[key];
  if (!item || !display) return;
  buttons.forEach(button => {const active=button.dataset.scenario===key;button.setAttribute('aria-pressed',String(active));button.classList.toggle('selected',active)});
  display.style.setProperty('--scenario-color',item.color);
  display.innerHTML = `<span class="scenario-label">SELECTED RESPONSE</span><h3>${item.label}</h3><dl><div><dt>Trigger</dt><dd>${item.sensor}</dd></div><div><dt>Robot action</dt><dd>${item.action}</dd></div></dl><p>${item.explanation}</p>`;
}
buttons.forEach(button => button.addEventListener('click',() => selectScenario(button.dataset.scenario)));
selectScenario('patrol');
