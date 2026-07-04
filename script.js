let slideIndex = 1; //this few lines of code modified from w3
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

const milestones = [ //for the timeline
    {
      year: "1963",
      lap: "LAP 01 · 1963",
      title: "Bruce Founds the Team",
      text: "A 25-year-old Kiwi racer, Bruce McLaren, sets up shop to build his own cars rather than drive someone else's.",
      tag: "Origin"
    },
    {
      year: "1968",
      lap: "LAP 02 · 1968",
      title: "First Grand Prix Win",
      text: "Bruce McLaren takes the wheel himself and wins the Belgian Grand Prix at Spa — the team's maiden Formula 1 victory.",
      tag: "Milestone"
    },
    {
      year: "1974",
      lap: "LAP 03 · 1974",
      title: "First World Championship",
      text: "Emerson Fittipaldi delivers McLaren's first Drivers' and Constructors' titles, four years after Bruce's death.",
      tag: "Championship"
    },
    {
      year: "1988",
      lap: "LAP 04 · 1988",
      title: "The Perfect Season",
      text: "Senna and Prost in the MP4/4 win 15 of 16 races — still one of the most dominant seasons the sport has seen.",
      tag: "Dominance"
    },
    {
      year: "1992",
      lap: "LAP 05 · 1992",
      title: "The F1 Road Car",
      text: "Gordon Murray's McLaren F1 lands with a central driving seat and a naturally aspirated V12 — soon the world's fastest production car.",
      tag: "Road Car"
    },
    {
      year: "1998",
      lap: "LAP 06 · 1998",
      title: "Häkkinen Takes the Crown",
      text: "Mika Häkkinen wins the first of back-to-back Drivers' Championships in the striking silver West-liveried MP4-13.",
      tag: "Championship"
    },
    {
      year: "2008",
      lap: "LAP 07 · 2008",
      title: "Hamilton, Youngest Champion",
      text: "Lewis Hamilton clinches the title on the final corner of the final lap in Brazil — McLaren's most recent Drivers' crown.",
      tag: "Championship"
    },
    {
      year: "2011",
      lap: "LAP 08 · 2011",
      title: "McLaren Automotive Returns",
      text: "The MP4-12C launches a standalone road car division, restarting McLaren as a serious supercar manufacturer.",
      tag: "Road Car"
    },
    {
      year: "2021",
      lap: "LAP 09 · 2021",
      title: "Back on the Top Step",
      text: "Daniel Ricciardo wins at Monza, McLaren's first Grand Prix victory in nine years, in front of a delirious pit wall.",
      tag: "Milestone"
    },
    {
      year: "2024",
      lap: "LAP 10 · 2024",
      title: "Constructors' Champions Again",
      text: "McLaren tops the Constructors' Championship for the first time since 1998, closing the gap on the sport's benchmark teams.",
      tag: "Championship"
    }
  ];

  function initTimeline(){//still timeline stuff
    const wrap = document.getElementById('waypoints');
    if (!wrap) { console.error('McLaren timeline: #waypoints not found, aborting init.'); return; }

    wrap.innerHTML = milestones.map(m => `
      <article class="waypoint">
        <span class="marker"></span>
        <span class="lapNumber">${m.lap}</span>
        <div class="sessionCard">
          <h2>${m.title}</h2>
          <p>${m.text}</p>
          <span class="tag">${m.tag}</span>
        </div>
      </article>
    `).join('');

    const points = document.querySelectorAll('.waypoint');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('seen'); });
      }, { threshold: 0.25 });
      points.forEach(p => io.observe(p));
    } else {
      points.forEach(p => p.classList.add('seen'));
    }

    const shell = document.querySelector('.circuitShell');
    const raceFill = document.getElementById('raceFill');
    const boostLevel = document.getElementById('boostLevel');
    const boostReadout = document.getElementById('boostReadout');

    if (!shell || !raceFill) return;

    function updateProgress(){
      try {
        const rect = shell.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.5;
        const passed = (window.innerHeight * 0.5) - rect.top;
        let pct = total > 0 ? (passed / total) * 100 : 0;
        pct = Math.max(0, Math.min(100, pct));
        raceFill.style.height = pct + '%';
        if (boostLevel) boostLevel.style.height = pct + '%';
        if (boostReadout) boostReadout.textContent = Math.round(pct) + '%';
      } catch (err) {
        console.error('McLaren timeline: scroll update failed', err);
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
