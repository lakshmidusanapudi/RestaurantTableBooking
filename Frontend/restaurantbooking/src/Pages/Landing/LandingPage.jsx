import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const restaurants = [
    {
      name: "Casa Lumen",
      tag: "Italian",
      meta: "Downtown · Rooftop terrace · Wine bar",
      rating: "4.9",
      price: "$$$",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "The Gilded Fork",
      tag: "Contemporary",
      meta: "Riverside · Tasting menu · Chef's table",
      rating: "4.8",
      price: "$$$$",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Rue Marchand",
      tag: "French Bistro",
      meta: "Old Town · Candlelit · Live jazz Fridays",
      rating: "4.7",
      price: "$$",
      img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const features = [
    {
      title: "Instant confirmation",
      text: "See real-time table availability and get confirmed the moment you book — no waiting on a callback.",
      icon: (
        <svg viewBox="0 0 44 44" fill="none">
          <rect x="6" y="10" width="32" height="26" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 18H38" stroke="currentColor" strokeWidth="1.4" />
          <path d="M14 6V14M30 6V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="14" cy="26" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Curated restaurants",
      text: "Every partner is vetted by our team — from local favourites to hard-to-book destination dining.",
      icon: (
        <svg viewBox="0 0 44 44" fill="none">
          <path
            d="M22 6L27 17L39 18.5L30 26.5L32.5 38L22 32L11.5 38L14 26.5L5 18.5L17 17L22 6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Flexible rescheduling",
      text: "Plans change. Move your reservation up to two hours before without calling the restaurant.",
      icon: (
        <svg viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="1.4" />
          <path d="M22 13V22L28 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Table preferences",
      text: "Ask for the terrace, a quiet corner, or a booth — note it once and we'll pass it on every time.",
      icon: (
        <svg viewBox="0 0 44 44" fill="none">
          <rect x="8" y="14" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16" cy="24" r="2.5" fill="currentColor" />
          <circle cx="28" cy="24" r="2.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      quote:
        "I booked our anniversary table from my phone during a meeting. Got a window seat exactly as requested, zero back and forth.",
      name: "Riya Kapoor",
      place: "Booked at Casa Lumen",
      initial: "R",
    },
    {
      quote:
        "The rescheduling feature saved us when our flight got delayed. Moved a dinner for six with two taps, no phone call needed.",
      name: "Daniel Ortiz",
      place: "Booked at The Gilded Fork",
      initial: "D",
    },
    {
      quote:
        "Finally got a table at Rue Marchand on a Friday night without knowing the owner. The map view made picking a seat so easy.",
      name: "Sara Lindqvist",
      place: "Booked at Rue Marchand",
      initial: "S",
    },
  ];

  const Arrow = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="tavola">
      <style>{`
        .tavola{
          --ink:#1C2321;
          --ink-2:#262F2B;
          --cream:#F6F1E7;
          --cream-dim:#ECE4D3;
          --brass:#B8874B;
          --brass-light:#D8B27E;
          --burgundy:#6E2A2A;
          --sage:#8A9A8B;
          --text-dark:#232B27;
          --text-soft:#5C645F;
          --line:rgba(28,35,33,0.14);
          --line-light:rgba(246,241,231,0.16);
          font-family:'Work Sans',sans-serif;
          background:var(--cream);
          color:var(--text-dark);
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .tavola *{box-sizing:border-box;}
        .tavola h1,.tavola h2,.tavola h3,.tavola .serif{
          font-family:'Fraunces',serif;
          font-weight:500;
          letter-spacing:-0.01em;
        }
        .tavola a{text-decoration:none;color:inherit;}
        .tavola img{display:block;max-width:100%;}
        .tavola button{font-family:inherit;cursor:pointer;border:none;background:none;}

        .tavola .eyebrow{
          font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;
          color:var(--brass);display:flex;align-items:center;gap:10px;
        }
        .tavola .eyebrow::before{content:"";width:22px;height:1px;background:var(--brass);display:inline-block;}

        .tavola .wrap{max-width:1240px;margin:0 auto;padding:0 40px;}

        .tavola .stub-divider{
          height:1px;width:100%;
          background-image:repeating-linear-gradient(to right, currentColor 0, currentColor 6px, transparent 6px, transparent 14px);
          color:var(--line);position:relative;
        }
        .tavola .stub-divider.on-dark{color:var(--line-light);}
        .tavola .stub-divider::before,.tavola .stub-divider::after{
          content:"";position:absolute;top:50%;width:22px;height:22px;background:var(--cream);border-radius:50%;transform:translateY(-50%);
        }
        .tavola .stub-divider::before{left:-11px;}
        .tavola .stub-divider::after{right:-11px;}
        .tavola .stub-divider.punch-ink::before,.tavola .stub-divider.punch-ink::after{background:var(--ink);}

        .tavola .navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:26px 0;transition:all .4s cubic-bezier(.2,.8,.2,1);}
        .tavola .navbar.scrolled{padding:16px 0;background:rgba(28,35,33,0.92);backdrop-filter:blur(10px);box-shadow:0 8px 30px rgba(0,0,0,0.18);}
        .tavola .nav-inner{display:flex;align-items:center;justify-content:space-between;}
        .tavola .logo{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:600;color:var(--cream);letter-spacing:0.01em;display:flex;align-items:baseline;gap:6px;}
        .tavola .logo span{color:var(--brass);font-style:italic;}
        .tavola .nav-links{display:flex;gap:44px;list-style:none;margin:0;padding:0;}
        .tavola .nav-links a{color:var(--cream);font-size:0.9rem;font-weight:500;letter-spacing:0.02em;position:relative;padding-bottom:4px;}
        .tavola .nav-links a::after{content:"";position:absolute;left:0;bottom:0;width:0%;height:1px;background:var(--brass);transition:width .3s ease;}
        .tavola .nav-links a:hover::after{width:100%;}
        .tavola .nav-actions{display:flex;align-items:center;gap:22px;}
        .tavola .nav-actions .login-link{color:var(--cream);font-size:0.88rem;font-weight:500;opacity:0.85;}
        .tavola .nav-actions .login-link:hover{opacity:1;}
        .tavola .btn-register{border:1px solid var(--brass);color:var(--brass-light);padding:9px 22px;border-radius:2px;font-size:0.85rem;font-weight:600;letter-spacing:0.03em;transition:all .3s ease;display:inline-block;}
        .tavola .btn-register:hover{background:var(--brass);color:var(--ink);}
        .tavola .nav-toggle{display:none;flex-direction:column;gap:5px;background:none;}
        .tavola .nav-toggle span{width:24px;height:1px;background:var(--cream);}
        .tavola .nav-links-mobile{
          position:absolute;top:100%;left:0;right:0;background:rgba(28,35,33,0.97);
          flex-direction:column;padding:24px 40px;gap:20px;display:flex;list-style:none;
        }
        .tavola .nav-links-mobile a{color:var(--cream);font-size:0.95rem;font-weight:500;}

        .tavola .hero{
          background:radial-gradient(ellipse at 15% 20%, rgba(184,135,75,0.12), transparent 55%),
            linear-gradient(180deg, var(--ink) 0%, #171D1B 100%);
          color:var(--cream);padding:170px 0 110px;position:relative;overflow:hidden;
        }
        .tavola .hero::before{
          content:"";position:absolute;inset:0;
          background-image:linear-gradient(rgba(246,241,231,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(246,241,231,0.035) 1px, transparent 1px);
          background-size:64px 64px;pointer-events:none;
          mask-image:radial-gradient(ellipse at 30% 30%, black, transparent 70%);
        }
        .tavola .hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:60px;align-items:center;position:relative;z-index:2;}
        .tavola .hero-copy h1{font-size:clamp(2.6rem, 5vw, 4.1rem);line-height:1.04;margin:22px 0 26px;color:var(--cream);}
        .tavola .hero-copy h1 em{font-style:italic;color:var(--brass-light);font-weight:400;}
        .tavola .hero-copy p{font-size:1.05rem;line-height:1.7;color:rgba(246,241,231,0.72);max-width:460px;margin-bottom:38px;}
        .tavola .hero-actions{display:flex;align-items:center;gap:28px;}
        .tavola .btn-primary{
          background:var(--brass);color:var(--ink);padding:16px 34px;font-size:0.92rem;font-weight:600;
          letter-spacing:0.02em;border-radius:2px;display:inline-flex;align-items:center;gap:10px;
          transition:all .35s cubic-bezier(.2,.8,.2,1);
        }
        .tavola .btn-primary:hover{background:var(--brass-light);transform:translateY(-2px);box-shadow:0 14px 30px rgba(184,135,75,0.28);}
        .tavola .btn-primary svg{transition:transform .3s ease;}
        .tavola .btn-primary:hover svg{transform:translateX(4px);}
        .tavola .hero-secondary-link{font-size:0.88rem;font-weight:500;color:var(--cream);border-bottom:1px solid var(--line-light);padding-bottom:3px;}
        .tavola .hero-stats{display:flex;gap:48px;margin-top:56px;padding-top:34px;border-top:1px solid var(--line-light);max-width:460px;flex-wrap:wrap;}
        .tavola .hero-stats div strong{display:block;font-family:'Fraunces',serif;font-size:1.7rem;color:var(--brass-light);font-weight:500;}
        .tavola .hero-stats div span{font-size:0.78rem;color:rgba(246,241,231,0.6);letter-spacing:0.02em;}

        .tavola .ticket{
          background:var(--cream);color:var(--text-dark);border-radius:6px;
          box-shadow:0 40px 80px rgba(0,0,0,0.45);display:grid;grid-template-columns:1fr 0.42fr;
          transform:rotate(2.5deg);position:relative;animation:tvFloat 6s ease-in-out infinite;
        }
        @keyframes tvFloat{0%,100%{transform:rotate(2.5deg) translateY(0);}50%{transform:rotate(2.5deg) translateY(-10px);}}
        .tavola .ticket-main{padding:34px 30px;border-right:1px dashed rgba(35,43,39,0.25);}
        .tavola .ticket-brand{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px;}
        .tavola .t-eyebrow{font-size:0.66rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-soft);font-weight:600;}
        .tavola .t-name{font-family:'Fraunces',serif;font-size:1.3rem;font-weight:600;margin-top:4px;}
        .tavola .ticket-status{
          font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:#2F6B4F;
          background:rgba(47,107,79,0.12);padding:5px 10px;border-radius:20px;
        }
        .tavola .ticket-details{display:grid;grid-template-columns:1fr 1fr;gap:20px 16px;margin-bottom:24px;}
        .tavola .ticket-details p{font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-soft);margin:0 0 5px;}
        .tavola .ticket-details strong{font-family:'Fraunces',serif;font-size:1.15rem;font-weight:500;}
        .tavola .ticket-barcode{
          height:36px;
          background:repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 5px, var(--ink) 5px 6px, transparent 6px 10px);
          opacity:0.85;margin-top:6px;
        }
        .tavola .ticket-stub{padding:30px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;}
        .tavola .stub-num{font-family:'Fraunces',serif;font-size:2.6rem;font-weight:600;color:var(--brass);line-height:1;}
        .tavola .stub-label{font-size:0.64rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-soft);}
        .tavola .stub-seats{display:flex;gap:4px;margin-top:10px;}
        .tavola .stub-seats span{width:7px;height:7px;border-radius:50%;background:var(--sage);}
        .tavola .stub-seats span.filled{background:var(--burgundy);}

        .tavola .float-badge{
          position:absolute;background:var(--ink);color:var(--cream);border:1px solid var(--line-light);
          padding:12px 16px;border-radius:8px;font-size:0.78rem;display:flex;align-items:center;gap:10px;
          box-shadow:0 20px 40px rgba(0,0,0,0.3);top:-10px;right:-30px;animation:tvFloat 5s ease-in-out infinite;animation-delay:.3s;
        }
        .tavola .float-badge .dot{width:8px;height:8px;border-radius:50%;background:#3FA66B;box-shadow:0 0 0 4px rgba(63,166,107,0.2);}

        .tavola section{padding:120px 0;}
        .tavola .section-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:64px;gap:40px;flex-wrap:wrap;}
        .tavola .section-head h2{font-size:clamp(2rem, 3.4vw, 2.7rem);margin-top:14px;max-width:520px;}
        .tavola .section-head p{max-width:340px;color:var(--text-soft);font-size:0.98rem;line-height:1.65;}

        .tavola .restaurants{background:var(--cream);}
        .tavola .rest-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:30px;}
        .tavola .rest-card{background:#fff;border-radius:8px;overflow:hidden;border:1px solid var(--line);transition:transform .35s ease, box-shadow .35s ease;}
        .tavola .rest-card:hover{transform:translateY(-8px);box-shadow:0 30px 50px rgba(28,35,33,0.14);}
        .tavola .rest-img{height:230px;width:100%;object-fit:cover;}
        .tavola .rest-img-wrap{position:relative;}
        .tavola .rest-tag{
          position:absolute;top:16px;left:16px;background:rgba(28,35,33,0.85);color:var(--cream);
          font-size:0.68rem;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border-radius:20px;font-weight:600;
        }
        .tavola .rest-body{padding:22px 24px 26px;}
        .tavola .rest-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;}
        .tavola .rest-top h3{font-size:1.2rem;font-weight:600;margin:0;}
        .tavola .rest-rating{display:flex;align-items:center;gap:4px;font-size:0.85rem;font-weight:600;color:var(--brass);white-space:nowrap;}
        .tavola .rest-meta{font-size:0.84rem;color:var(--text-soft);margin-bottom:18px;}
        .tavola .rest-foot{display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px dashed var(--line);}
        .tavola .rest-price{font-size:0.85rem;color:var(--text-soft);}
        .tavola .rest-reserve{font-size:0.8rem;font-weight:600;color:var(--burgundy);display:flex;align-items:center;gap:6px;}
        .tavola .rest-reserve svg{transition:transform .25s ease;}
        .tavola .rest-card:hover .rest-reserve svg{transform:translateX(3px);}

        .tavola .view-all-row{display:flex;justify-content:center;margin-top:50px;}
        .tavola .btn-outline{
          border:1px solid var(--text-dark);padding:14px 32px;font-size:0.85rem;font-weight:600;
          letter-spacing:0.03em;border-radius:2px;transition:all .3s ease;display:inline-block;
        }
        .tavola .btn-outline:hover{background:var(--ink);color:var(--cream);border-color:var(--ink);}

        .tavola .features{background:var(--ink);color:var(--cream);}
        .tavola .features .section-head p{color:rgba(246,241,231,0.6);}
        .tavola .feat-grid{display:grid;grid-template-columns:repeat(4, 1fr);gap:1px;background:var(--line-light);border:1px solid var(--line-light);}
        .tavola .feat-card{background:var(--ink);padding:38px 30px;transition:background .3s ease;}
        .tavola .feat-card:hover{background:var(--ink-2);}
        .tavola .feat-icon{width:44px;height:44px;margin-bottom:24px;color:var(--brass-light);}
        .tavola .feat-card h3{font-size:1.1rem;font-weight:600;margin:0 0 10px;color:var(--cream);}
        .tavola .feat-card p{font-size:0.88rem;line-height:1.65;color:rgba(246,241,231,0.58);margin:0;}

        .tavola .testimonials{background:var(--cream-dim);}
        .tavola .test-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:28px;}
        .tavola .test-card{background:var(--cream);padding:36px 32px;border-radius:8px;border:1px solid var(--line);display:flex;flex-direction:column;gap:22px;}
        .tavola .test-quote{font-family:'Fraunces',serif;font-style:italic;font-size:1.12rem;line-height:1.6;color:var(--text-dark);margin:0;}
        .tavola .test-quote::before{content:"\\201C";color:var(--brass);}
        .tavola .test-quote::after{content:"\\201D";color:var(--brass);}
        .tavola .test-person{display:flex;align-items:center;gap:14px;padding-top:18px;border-top:1px dashed var(--line);}
        .tavola .test-avatar{
          width:42px;height:42px;border-radius:50%;background:var(--ink);color:var(--brass-light);
          display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:600;font-size:0.95rem;
        }
        .tavola .test-person strong{display:block;font-size:0.9rem;font-weight:600;}
        .tavola .test-person span{font-size:0.78rem;color:var(--text-soft);}

        .tavola .cta-strip{background:linear-gradient(120deg, var(--burgundy), #4E1D1D);color:var(--cream);padding:70px 0;}
        .tavola .cta-strip .wrap{display:flex;justify-content:space-between;align-items:center;gap:30px;flex-wrap:wrap;}
        .tavola .cta-strip h2{font-size:clamp(1.7rem,3vw,2.3rem);max-width:480px;margin:0;}
        .tavola .cta-strip p{color:rgba(246,241,231,0.75);margin-top:10px;font-size:0.95rem;}

        .tavola footer{background:var(--ink);color:rgba(246,241,231,0.7);padding:80px 0 30px;}
        .tavola .foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:50px;padding-bottom:60px;}
        .tavola .foot-brand .logo{margin-bottom:16px;}
        .tavola .foot-brand p{font-size:0.9rem;line-height:1.7;max-width:280px;color:rgba(246,241,231,0.55);}
        .tavola .foot-col h4{font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--brass-light);margin-bottom:20px;font-weight:600;}
        .tavola .foot-col ul{list-style:none;display:flex;flex-direction:column;gap:12px;margin:0;padding:0;}
        .tavola .foot-col a{font-size:0.88rem;color:rgba(246,241,231,0.65);transition:color .2s ease;}
        .tavola .foot-col a:hover{color:var(--brass-light);}
        .tavola .foot-form{display:flex;border-bottom:1px solid var(--line-light);padding-bottom:10px;margin-top:10px;}
        .tavola .foot-form input{background:none;border:none;color:var(--cream);font-size:0.88rem;flex:1;outline:none;}
        .tavola .foot-form input::placeholder{color:rgba(246,241,231,0.4);}
        .tavola .foot-form button{color:var(--brass-light);font-size:0.85rem;font-weight:600;}
        .tavola .foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:26px;font-size:0.8rem;color:rgba(246,241,231,0.4);flex-wrap:wrap;gap:12px;}
        .tavola .foot-social{display:flex;gap:18px;}
        .tavola .foot-social a{
          width:34px;height:34px;border:1px solid var(--line-light);border-radius:50%;
          display:flex;align-items:center;justify-content:center;color:rgba(246,241,231,0.7);
        }
        .tavola .foot-social a:hover{border-color:var(--brass-light);color:var(--brass-light);}

        @media (max-width:980px){
          .tavola .wrap{padding:0 24px;}
          .tavola .nav-links, .tavola .nav-actions .login-link{display:none;}
          .tavola .nav-toggle{display:flex;}
          .tavola .hero{padding:130px 0 80px;}
          .tavola .hero-grid{grid-template-columns:1fr;gap:70px;}
          .tavola .ticket{max-width:420px;margin:0 auto;transform:rotate(0);}
          .tavola .rest-grid{grid-template-columns:repeat(2,1fr);}
          .tavola .feat-grid{grid-template-columns:repeat(2,1fr);}
          .tavola .test-grid{grid-template-columns:1fr;}
          .tavola .foot-grid{grid-template-columns:1fr 1fr;}
          .tavola .section-head{flex-direction:column;align-items:flex-start;}
        }
        @media (max-width:600px){
          .tavola .rest-grid{grid-template-columns:1fr;}
          .tavola .feat-grid{grid-template-columns:1fr;}
          .tavola .foot-grid{grid-template-columns:1fr;}
          .tavola .hero-stats{gap:30px;}
          .tavola section{padding:80px 0;}
        }
        @media (prefers-reduced-motion: reduce){
          .tavola .ticket, .tavola .float-badge{animation:none;}
        }
        .tavola :focus-visible{outline:2px solid var(--brass);outline-offset:3px;}
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#home" className="logo">
            Tavola<span>.</span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#restaurants">Restaurants</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-actions">
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </div>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
          {menuOpen && (
            <ul className="nav-links-mobile">
              <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#restaurants" onClick={() => setMenuOpen(false)}>Restaurants</a></li>
              <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link></li>
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </ul>
          )}
        </div>
      </nav>
      <header className="hero" id="home">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Table Reservations, Made Effortless</p>
            <h1>
              Reserve your <em>favourite</em> restaurant
              <br />
              in under a minute
            </h1>
            <p>
              From neighbourhood favourites to chef's-table icons — check live availability, pick
              your table, and get instant confirmation. No calls, no waiting.
            </p>
            <div className="hero-actions">
              <a href="#restaurants" className="btn-primary">
                Explore Restaurants <Arrow />
              </a>
              <a href="#features" className="hero-secondary-link">How it works</a>
            </div>
            <div className="hero-stats">
              <div><strong>1,200+</strong><span>Partner restaurants</span></div>
              <div><strong>85K</strong><span>Tables booked monthly</span></div>
              <div><strong>4.9 / 5</strong><span>Average diner rating</span></div>
            </div>
          </div>

          <div className="hero-visual" style={{ position: "relative" }}>
            <div className="ticket">
              <div className="ticket-main">
                <div className="ticket-brand">
                  <div>
                    <p className="t-eyebrow">Reservation</p>
                    <p className="t-name">Casa Lumen</p>
                  </div>
                  <span className="ticket-status">Confirmed</span>
                </div>
                <div className="ticket-details">
                  <div><p>Date</p><strong>Aug 14</strong></div>
                  <div><p>Time</p><strong>7:30 PM</strong></div>
                  <div><p>Party</p><strong>4 Guests</strong></div>
                  <div><p>Seating</p><strong>Terrace</strong></div>
                </div>
                <div className="ticket-barcode"></div>
              </div>
              <div className="ticket-stub">
                <span className="stub-num">12</span>
                <span className="stub-label">Table No.</span>
                <div className="stub-seats">
                  <span className="filled"></span>
                  <span className="filled"></span>
                  <span className="filled"></span>
                  <span className="filled"></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="float-badge">
              <span className="dot"></span> Table just confirmed in Rome
            </div>
          </div>
        </div>
      </header>

      <div className="stub-divider punch-ink on-dark" style={{ backgroundColor: "var(--ink)" }}></div>

      <section className="restaurants" id="restaurants">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Curated For You</p>
              <h2>Popular restaurants this week</h2>
            </div>
            <p>Hand-picked by our concierge team from the cities' most booked dining rooms.</p>
          </div>

          <div className="rest-grid">
            {restaurants.map((r) => (
              <div className="rest-card" key={r.name}>
                <div className="rest-img-wrap">
                  <img className="rest-img" src={r.img} alt={r.name} />
                  <span className="rest-tag">{r.tag}</span>
                </div>
                <div className="rest-body">
                  <div className="rest-top">
                    <h3>{r.name}</h3>
                    <span className="rest-rating">★ {r.rating}</span>
                  </div>
                  <p className="rest-meta">{r.meta}</p>
                  <div className="rest-foot">
                    <span className="rest-price">{r.price}</span>
                    <a href="#" className="rest-reserve">Reserve <Arrow size={14} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-row">
            <a href="#" className="btn-outline">View all restaurants</a>
          </div>
        </div>
      </section>

      <div className="stub-divider"></div>

      <section className="features" id="features">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why Tavola</p>
              <h2>Booking a table, done properly</h2>
            </div>
            <p>Every detail of the reservation flow is built around getting you seated, not stuck on hold.</p>
          </div>

          <div className="feat-grid">
            {features.map((f) => (
              <div className="feat-card" key={f.title}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials" id="about">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Diner Stories</p>
              <h2>What our guests are saying</h2>
            </div>
            <p>A few words from people who've swapped hold music for a confirmed table.</p>
          </div>

          <div className="test-grid">
            {testimonials.map((t) => (
              <div className="test-card" key={t.name}>
                <p className="test-quote">{t.quote}</p>
                <div className="test-person">
                  <div className="test-avatar">{t.initial}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="wrap">
          <div>
            <h2 className="serif">Hungry? Your table is a minute away.</h2>
            <p>Join 1,200+ restaurants already taking reservations through Tavola.</p>
          </div>
          <a href="#restaurants" className="btn-primary">
            Explore Restaurants <Arrow />
          </a>
        </div>
      </section>

      <footer id="contact">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#" className="logo">Tavola<span>.</span></a>
              <p>A reservations platform built for diners who'd rather be eating than waiting on hold.</p>
            </div>
            <div className="foot-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#restaurants">Restaurants</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">Careers</a></li>
                <li><a href="#">For restaurants</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Stay in the loop</h4>
              <p style={{ fontSize: "0.85rem", color: "rgba(246,241,231,0.55)", marginBottom: 6 }}>
                New openings and last-minute tables, once a week.
              </p>
              <form className="foot-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" required />
                <button type="submit">Sign up</button>
              </form>
            </div>
          </div>
          <div className="stub-divider on-dark" style={{ marginBottom: 26 }}></div>
          <div className="foot-bottom">
            <span>© 2026 Tavola. All rights reserved.</span>
            <div className="foot-social">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">X</a>
              <a href="#" aria-label="Facebook">FB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}