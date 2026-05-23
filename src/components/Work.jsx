'use client';
import React, { useRef, useCallback, useState, useEffect } from 'react'

const workCard = [
  {
    image: '/images/Strategy/Strategy-Thumbnail.jpg',
    name: 'Strategy',
    link: 'www.khakigemstone.com',
    tag: 'Phase 01',
    images: [
      {
        src: '/images/Strategy/Strategy-1.jpg',
        title: 'Discovery Call',
        description: 'Every project starts with a live conversation. I sit down with you to understand your goals, your users, and the competitive landscape. No templates, no assumptions, just focused questions and real listening.',
        detail: 'I map out success metrics, project constraints, and non-negotiables before a single pixel is touched.',
      },
      {
        src: '/images/Strategy/Strategy-2.jpg',
        title: 'Research & Analysis',
        description: 'Once I understand your world, I go deep. Competitor audits, user persona mapping, market positioning, all synthesized into a working strategy board that we align around together.',
        detail: 'Deliverable: a shared research board with findings, personas, and opportunity gaps clearly defined.',
      },
      {
        src: '/images/Strategy/Strategy-3.jpg',
        title: 'Roadmap & Sign-off',
        description: 'Strategy without a plan is just talk. I translate all research into a concrete project roadmap, phases, timelines, deliverables, and milestones, then walk you through every line before you approve.',
        detail: 'Nothing moves to design until the roadmap has your written sign-off. This protects you and me.',
      },
    ],
    details: [
      { label: 'Discovery', value: 'Market research & competitor analysis' },
      { label: 'Workshops', value: 'Stakeholder alignment sessions' },
      { label: 'Deliverable', value: 'Brand strategy document & roadmap' },
    ],
  },
  {
    image: '/images/Designing/Designing-thumbnail.jpg',
    name: 'Designing',
    link: 'www.khakigemstone.com',
    tag: 'Phase 02',
    images: [
      {
        src: '/images/Designing/Designing-1.jpg',
        title: 'Wireframes & Structure',
        description: 'Before any colour or style, I map out the skeleton of every screen. Wireframes define layout, hierarchy, and user flow, solving structural problems early, when changes are cheap.',
        detail: 'Wireframes are reviewed and approved before I move into visual design.',
      },
      {
        src: '/images/Designing/Designing-2.jpg',
        title: 'Visual Design',
        description: 'With structure locked in, I apply the full visual layer, typography, colour system, spacing, motion. Every decision is rooted in your brand and the strategy we built together.',
        detail: 'Deliverable: a complete Figma file with all screens, components, and design tokens.',
      },
      {
        src: '/images/Designing/Designing-3.jpg',
        title: 'Prototype & Handoff',
        description: 'Interactive prototypes let you feel the product before it\'s built. I click through every flow, collect your feedback, finalise every detail, then hand off a developer-ready Figma file.',
        detail: 'Two revision rounds are included. Additional rounds are scoped separately.',
      },
    ],
    details: [
      { label: 'UI/UX', value: 'Wireframes, prototypes & final visuals' },
      { label: 'System', value: 'Design tokens & component library' },
      { label: 'Deliverable', value: 'Figma source files & style guide' },
    ],
  },
  {
    image: '/images/Developer/Developer-thumbnail.jpg',
    name: 'Development',
    link: 'www.khakigemstone.com',
    tag: 'Phase 03',
    images: [
      {
        src: '/images/Developer/Developer-1.jpg',
        title: 'Architecture & Setup',
        description: 'I scaffold the project with the right stack for your scale, Next.js, Tailwind, headless CMS, or no-code depending on your needs. CI/CD pipelines and code standards are set from day one.',
        detail: 'Every project follows a structured repo, code review process, and deployment pipeline.',
      },
      {
        src: '/images/Developer/Developer-2.jpg',
        title: 'Build & Review',
        description: 'Components are built in isolation, tested, then assembled into full pages. You have access to a staging environment throughout, so you can follow progress in real time and flag anything early.',
        detail: 'Weekly check-ins keep you in the loop without slowing things down.',
      },
      {
        src: '/images/Developer/Developer-3.jpg',
        title: 'Launch & Handoff',
        description: 'When everything is tested and approved, I deploy to production. You receive a full handoff, documented codebase, CMS training, and a post-launch window for any immediate fixes.',
        detail: 'Post-launch support packages are available for ongoing maintenance and feature work.',
      },
    ],
    details: [
      { label: 'Stack', value: 'Next.js, React, Tailwind CSS' },
      { label: 'Quality', value: 'Code review, testing & CI/CD' },
      { label: 'Deliverable', value: 'Deployed product & documentation' },
    ],
  },
]

function Modal({ card, index, onClose }) {
  const [activeImg, setActiveImg]   = useState(0)
  const [closing, setClosing]       = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const [isMd, setIsMd]             = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsMd(mq.matches)
    const handler = (e) => setIsMd(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') triggerClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const triggerClose = () => { setClosing(true); setTimeout(onClose, 320) }
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) triggerClose() }

  const selectImage = (i) => {
    if (i === activeImg) return
    setActiveImg(i)
    setContentKey(k => k + 1)
  }
  const prevImg = () => selectImage((activeImg - 1 + card.images.length) % card.images.length)
  const nextImg = () => selectImage((activeImg + 1) % card.images.length)

  const current = card.images[activeImg]

  return (
    <>
      <style>{`
        @keyframes mFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes mFadeOut { from{opacity:1} to{opacity:0} }
        @keyframes mSlideIn {
          from{opacity:0;transform:translateY(36px) scale(0.97)}
          to  {opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes mSlideUp {
          from{opacity:0;transform:translateY(100%)}
          to  {opacity:1;transform:translateY(0)}
        }
        @keyframes mSlideOut {
          from{opacity:1;transform:translateY(0) scale(1)}
          to  {opacity:0;transform:translateY(24px) scale(0.97)}
        }
        @keyframes mSlideDown {
          from{opacity:1;transform:translateY(0)}
          to  {opacity:0;transform:translateY(100%)}
        }
        @keyframes contentIn {
          from{opacity:0;transform:translateY(12px)}
          to  {opacity:1;transform:translateY(0)}
        }
        @keyframes thumbIn {
          from{opacity:0;transform:scale(0.85)}
          to  {opacity:1;transform:scale(1)}
        }

        .m-backdrop { animation: ${closing ? 'mFadeOut' : 'mFadeIn'} 0.3s ease forwards }
        .m-panel-desktop { animation: ${closing ? 'mSlideOut' : 'mSlideIn'} 0.38s cubic-bezier(0.22,1,0.36,1) forwards }
        .m-panel-mobile  { animation: ${closing ? 'mSlideDown' : 'mSlideUp'} 0.38s cubic-bezier(0.22,1,0.36,1) forwards }

        .m-content-in { animation: contentIn 0.32s cubic-bezier(0.22,1,0.36,1) both }

        .m-thumb { animation: thumbIn 0.28s ease both; transition: outline-color 0.2s, opacity 0.2s, transform 0.2s }
        .m-thumb:nth-child(1){animation-delay:0.04s}
        .m-thumb:nth-child(2){animation-delay:0.1s}
        .m-thumb:nth-child(3){animation-delay:0.16s}
        .m-thumb:hover{transform:scale(1.06)}

        .m-arrow { transition: background 0.2s, transform 0.18s }
        .m-arrow:hover { background: var(--color-brand) !important; transform: scale(1.1) }
        .m-arrow:active { transform: scale(0.93) }

        .m-close { transition: background 0.2s, transform 0.18s }
        .m-close:hover { background: rgba(255,255,255,0.18) !important; transform: scale(1.08) }
        .m-close:active { transform: scale(0.94) }

        .m-detail-row { transition: background 0.18s }
        .m-detail-row:hover { background: rgba(255,255,255,0.05) }

        .m-cta { transition: transform 0.2s, box-shadow 0.22s }
        .m-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px -4px color-mix(in srgb, var(--color-brand) 50%, transparent);
        }
        .m-cta:active { transform: translateY(0) }

        .m-dot { transition: width 0.3s, background 0.3s }

        .m-right::-webkit-scrollbar { width: 3px }
        .m-right::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius:9999px }
        .m-right { scrollbar-width:thin; scrollbar-color: rgba(255,255,255,0.1) transparent }

        .m-thumbstrip::-webkit-scrollbar { display:none }
        .m-thumbstrip { scrollbar-width:none }

        .m-img-crossfade {
          transition: opacity 0.42s ease, transform 0.42s cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      <div
        className='m-backdrop fixed inset-0 z-[200] flex items-end md:items-center justify-center'
        style={{
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding: isMd ? '24px' : '0', alignItems: isMd ? 'center' : 'stretch',
        }}
        onClick={handleBackdrop}
      >
        
        <div
          className={isMd ? 'm-panel-desktop' : 'm-panel-mobile'}
          style={{
            position: 'relative',
            width: isMd ? 'min(92vw, 1200px)' : '100%',
            height: isMd ? 'min(88vh, 620px)' : '100dvh',
            maxHeight: isMd ? 'min(88vh, 620px)' : '100dvh',
            background: '#111',
            borderRadius: isMd ? 24 : 0,
            display: 'flex',
            flexDirection: isMd ? 'row' : 'column',
            overflow: 'hidden',
          }}
        >

          <div style={{
            position: 'relative',
            width: isMd ? '64%' : '100%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#0a0a0a',
            height: isMd ? '100%' : 'auto', maxHeight: isMd ? undefined : '45dvh',
          }}>

            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: isMd ? 0 : 220,
              overflow: 'hidden',
            }}>
              
              {!isMd && (
                <div style={{ paddingTop: '56.25%', position: 'relative' }}>
                  {card.images.map((img, i) => (
                    <img key={i} src={img.src} alt={img.title} draggable={false}
                      className='m-img-crossfade'
                      style={{
                        position:'absolute', inset:0, width:'100%', height:'100%',
                        objectFit:'cover',
                        opacity: activeImg === i ? 1 : 0,
                        transform: activeImg === i ? 'scale(1)' : 'scale(1.04)',
                        pointerEvents: activeImg === i ? 'auto' : 'none',
                      }}
                    />
                  ))}
                </div>
              )}
              
              {isMd && card.images.map((img, i) => (
                <img key={i} src={img.src} alt={img.title} draggable={false}
                  className='m-img-crossfade'
                  style={{
                    position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'contain',
                    opacity: activeImg === i ? 1 : 0,
                    transform: activeImg === i ? 'scale(1)' : 'scale(1.04)',
                    pointerEvents: activeImg === i ? 'auto' : 'none',
                  }}
                />
              ))}

              <div style={{
                position:'absolute', inset:'auto 0 0 0', height:96, pointerEvents:'none',
                background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              }}/>
              
              <div style={{
                position:'absolute', inset:'0 0 auto 0', height:72, pointerEvents:'none',
                background:'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
              }}/>

              <div style={{
                position:'absolute', top:16, left:16, zIndex:10,
                background:'var(--color-brand)', color:'#000',
                fontSize:10, fontWeight:700, letterSpacing:'0.14em',
                textTransform:'uppercase', padding:'6px 12px', borderRadius:9999,
              }}>
                {card.tag}
              </div>

              {!isMd && (
                <button onClick={triggerClose} aria-label='Close'
                  className='m-close'
                  style={{
                    position:'absolute', top:14, right:14, zIndex:10,
                    width:36, height:36, borderRadius:'50%',
                    border:'1.5px solid rgba(255,255,255,0.2)',
                    background:'rgba(0,0,0,0.6)', color:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
                  }}>
                  <svg width='12' height='12' viewBox='0 0 24 24' fill='none'
                    stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M18 6L6 18M6 6l12 12'/>
                  </svg>
                </button>
              )}

              {card.images.length > 1 && (<>
                <button onClick={prevImg} aria-label='Previous' className='m-arrow'
                  style={{
                    position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', zIndex:10,
                    width:36, height:36, borderRadius:'50%', cursor:'pointer',
                    background:'rgba(0,0,0,0.58)', border:'1.5px solid rgba(255,255,255,0.15)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                  <svg width='13' height='13' viewBox='0 0 24 24' fill='none'
                    stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M19 12H5M12 19l-7-7 7-7'/>
                  </svg>
                </button>
                <button onClick={nextImg} aria-label='Next' className='m-arrow'
                  style={{
                    position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', zIndex:10,
                    width:36, height:36, borderRadius:'50%', cursor:'pointer',
                    background:'rgba(0,0,0,0.58)', border:'1.5px solid rgba(255,255,255,0.15)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                  <svg width='13' height='13' viewBox='0 0 24 24' fill='none'
                    stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M5 12h14M12 5l7 7-7 7'/>
                  </svg>
                </button>
              </>)}

              {card.images.length > 1 && (
                <div style={{
                  position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)', zIndex:10,
                  display:'flex', alignItems:'center', gap:6,
                }}>
                  {card.images.map((_, i) => (
                    <button key={i} onClick={() => selectImage(i)}
                      className='m-dot'
                      style={{
                        width: activeImg===i ? 20 : 6, height:6, borderRadius:9999,
                        border:'none', cursor:'pointer', padding:0,
                        background: activeImg===i ? 'var(--color-brand)' : 'rgba(255,255,255,0.35)',
                      }}
                      aria-label={`Image ${i+1}`}
                    />
                  ))}
                </div>
              )}

              <div style={{
                position:'absolute', bottom:14, right:14, zIndex:10,
                fontSize:10, fontWeight:600, padding:'4px 9px', borderRadius:9999,
                background:'rgba(0,0,0,0.6)', color:'rgba(255,255,255,0.75)',
                border:'1px solid rgba(255,255,255,0.1)',
              }}>
                {activeImg+1} / {card.images.length}
              </div>
            </div>

            {card.images.length > 1 && (
              <div className='m-thumbstrip' style={{
                display:'flex', gap:8, padding:'10px 14px', flexShrink:0,
                background:'#0d0d0d', borderTop:'1px solid rgba(255,255,255,0.05)',
                overflowX:'auto',
              }}>
                {card.images.map((img, i) => (
                  <button key={i} onClick={() => selectImage(i)}
                    className='m-thumb'
                    aria-label={img.title}
                    style={{
                      flexShrink:0,
                      width: isMd ? 96 : 72,
                      aspectRatio:'16/9',
                      borderRadius:8, overflow:'hidden', padding:0, border:'none',
                      outline: activeImg===i ? '2px solid var(--color-brand)' : '2px solid rgba(255,255,255,0.08)',
                      outlineOffset: activeImg===i ? 2 : 0,
                      opacity: activeImg===i ? 1 : 0.45,
                      cursor:'pointer',
                    }}>
                    <img src={img.src} alt={img.title}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='m-right' style={{
            flex:1, display:'flex', flexDirection:'column',
            overflowY:'auto', overscrollBehavior:'contain', minWidth:0,
          }}>

            <div style={{
              padding: isMd ? '28px 28px 20px' : '20px 20px 16px',
              borderBottom:'1px solid rgba(255,255,255,0.07)',
              flexShrink:0,
              display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12,
            }}>
              <div>
                
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                  {workCard.map((_, i) => (
                    <div key={i} className='m-dot' style={{
                      height:5, borderRadius:9999,
                      width: i===index ? 18 : 5,
                      background: i===index ? 'var(--color-brand)' : 'rgba(255,255,255,0.18)',
                    }}/>
                  ))}
                  <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginLeft:4, fontWeight:500 }}>
                    {card.tag}
                  </span>
                </div>
                <h2 style={{
                  fontSize: isMd ? 34 : 26,
                  fontWeight:700, lineHeight:1, letterSpacing:'-0.02em', color:'#fff', margin:0,
                }}>
                  <span style={{ color:'var(--color-brand)' }}>{String(index+1).padStart(2,'0')} </span>
                  {card.name}
                </h2>
              </div>

              {isMd && (
                <button onClick={triggerClose} aria-label='Close'
                  className='m-close'
                  style={{
                    flexShrink:0, width:36, height:36, borderRadius:'50%',
                    border:'1.5px solid rgba(255,255,255,0.12)',
                    background:'rgba(255,255,255,0.07)', color:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', marginTop:2,
                  }}>
                  <svg width='12' height='12' viewBox='0 0 24 24' fill='none'
                    stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M18 6L6 18M6 6l12 12'/>
                  </svg>
                </button>
              )}
            </div>

            <div key={contentKey} className='m-content-in' style={{
              padding: isMd ? '22px 28px 0' : '18px 20px 0',
              flexShrink:0,
            }}>
              
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{
                  width:3, height:20, borderRadius:9999, flexShrink:0,
                  background:'var(--color-brand)',
                }}/>
                <h3 style={{ fontSize: isMd ? 16 : 14, fontWeight:600, color:'#fff', margin:0 }}>
                  {current.title}
                </h3>
              </div>

              <p style={{
                fontSize: isMd ? 14 : 13, lineHeight:1.8, fontWeight:300,
                color:'rgba(255,255,255,0.58)', margin:'0 0 14px',
              }}>
                {current.description}
              </p>

              <div style={{
                display:'flex', alignItems:'flex-start', gap:10,
                background:'rgba(254,175,58,0.07)', border:'1px solid rgba(254,175,58,0.2)',
                borderRadius:12, padding:'12px 14px',
              }}>
                <svg style={{ flexShrink:0, marginTop:1 }} width='13' height='13' viewBox='0 0 24 24' fill='none'
                  stroke='var(--color-brand)' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                  <circle cx='12' cy='12' r='10'/><path d='M12 8v4M12 16h.01'/>
                </svg>
                <p style={{ fontSize: isMd ? 13 : 12, lineHeight:1.65, color:'rgba(255,255,255,0.55)', margin:0 }}>
                  {current.detail}
                </p>
              </div>
            </div>

            <div style={{
              height:1, background:'rgba(255,255,255,0.06)',
              margin: isMd ? '20px 28px 0' : '16px 20px 0', flexShrink:0,
            }}/>

            <div style={{
              padding: isMd ? '18px 28px 0' : '16px 20px 0',
              flexShrink:0,
            }}>
              <p style={{
                fontSize:10, fontWeight:700, textTransform:'uppercase',
                letterSpacing:'0.12em', color:'rgba(255,255,255,0.25)', marginBottom:10,
              }}>
                Phase Overview
              </p>
              <div style={{
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden',
              }}>
                {card.details.map((d, i) => (
                  <div key={i} className='m-detail-row' style={{
                    display:'flex', alignItems:'flex-start', gap:12,
                    padding:'11px 14px',
                    borderBottom: i < card.details.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <span style={{
                      fontSize:10, fontWeight:700, textTransform:'uppercase',
                      letterSpacing:'0.1em', color:'var(--color-brand)',
                      flexShrink:0, width:72, paddingTop:1,
                    }}>
                      {d.label}
                    </span>
                    <span style={{ fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.68)' }}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex:1, minHeight:20 }}/>

            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
              padding: isMd ? '16px 28px' : '14px 20px',
              borderTop:'1px solid rgba(255,255,255,0.06)', flexShrink:0,
            }}>
              <a href={`https://${card.link}`} target='_blank' rel='noreferrer'
                style={{
                  display:'inline-flex', alignItems:'center', gap:5,
                  fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.35)',
                  textDecoration:'none', transition:'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.85)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.35)'}
              >
                <svg width='11' height='11' viewBox='0 0 24 24' fill='none'
                  stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3'/>
                </svg>
                {card.link}
              </a>

              <a href={`https://${card.link}`} target='_blank' rel='noreferrer'
                className='m-cta'
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'10px 20px', borderRadius:9999,
                  background:'var(--color-brand)', color:'#000',
                  fontSize:13, fontWeight:700, letterSpacing:'0.03em',
                  textDecoration:'none', flexShrink:0,
                }}>
                Start With Us
                <svg width='13' height='13' viewBox='0 0 24 24' fill='none'
                  stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M5 12h14M12 5l7 7-7 7'/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function Work() {
  const trackRef   = useRef(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)
  const lastX      = useRef(0)
  const lastTime   = useRef(0)
  const velocity   = useRef(0)
  const rafId      = useRef(null)
  const touchStart = useRef(null)
  const didDrag    = useRef(false)

  const [canPrev, setCanPrev]   = useState(false)
  const [canNext, setCanNext]   = useState(true)
  const [openCard, setOpenCard] = useState(null)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateArrows, { passive: true })
    updateArrows()
    return () => track.removeEventListener('scroll', updateArrows)
  }, [updateArrows])

  const cancelMomentum = () => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null }
  }
  const startMomentum = useCallback(() => {
    cancelMomentum()
    const track = trackRef.current; if (!track) return
    const step = () => {
      if (Math.abs(velocity.current) < 0.5) return
      track.scrollLeft += velocity.current; velocity.current *= 0.92
      rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
  }, [])

  const slideBy = (dir) => {
    cancelMomentum()
    const track = trackRef.current; if (!track) return
    const cardW = track.querySelector('.work-card')?.offsetWidth ?? 500
    track.scrollBy({ left: dir * (cardW + 24), behavior: 'smooth' })
  }

  const onMouseDown = (e) => {
    cancelMomentum()
    isDragging.current = true; didDrag.current = false
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    lastX.current = e.pageX; lastTime.current = Date.now(); velocity.current = 0
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseLeave = () => {
    if (!isDragging.current) return
    isDragging.current = false; trackRef.current.style.cursor = 'grab'; startMomentum()
  }
  const onMouseUp = () => {
    isDragging.current = false; trackRef.current.style.cursor = 'grab'; startMomentum()
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return; e.preventDefault()
    const dx = e.pageX - lastX.current
    if (Math.abs(dx) > 3) didDrag.current = true
    const now = Date.now(); const dt = now - lastTime.current || 1
    velocity.current = -(dx) / dt * 16
    trackRef.current.scrollLeft = scrollLeft.current - (e.pageX - trackRef.current.offsetLeft - startX.current)
    lastX.current = e.pageX; lastTime.current = now
  }
  const onTouchStart = (e) => {
    cancelMomentum(); didDrag.current = false
    touchStart.current = { x: e.touches[0].pageX, scrollLeft: trackRef.current.scrollLeft }
    lastX.current = e.touches[0].pageX; lastTime.current = Date.now(); velocity.current = 0
  }
  const onTouchMove = (e) => {
    if (!touchStart.current) return
    const dx = e.touches[0].pageX - lastX.current
    if (Math.abs(dx) > 4) didDrag.current = true
    const dt = Date.now() - lastTime.current || 1
    velocity.current = -(dx / dt) * 16
    trackRef.current.scrollLeft = touchStart.current.scrollLeft - (e.touches[0].pageX - touchStart.current.x)
    lastX.current = e.touches[0].pageX; lastTime.current = Date.now()
  }
  const onTouchEnd = () => { touchStart.current = null; startMomentum() }

  const handleCardClick = (card, index) => {
    if (didDrag.current) return
    setOpenCard({ card, index })
  }

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        .work-card-img{transition:transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)}
        .work-card:hover .work-card-img{transform:scale(1.05)}
        .work-card-overlay{
          background:linear-gradient(to top,
            color-mix(in srgb,var(--color-brand) 80%,#000) 0%,
            color-mix(in srgb,var(--color-brand) 20%,transparent) 45%,
            transparent 70%);
          opacity:0;transition:opacity 0.4s ease;
        }
        .work-card:hover .work-card-overlay{opacity:1}
        .work-card-pill{opacity:0;transform:translateY(8px);transition:opacity 0.3s ease 0.05s,transform 0.3s ease 0.05s}
        .work-card:hover .work-card-pill{opacity:1;transform:translateY(0)}
        .work-card-name{display:inline-block;transition:color 0.35s ease}
        .work-card:hover .work-card-name{color:var(--color-brand)}
        .work-card-step{
          display:inline-block;color:var(--color-brand);font-weight:600;
          white-space:nowrap;overflow:hidden;max-width:0;opacity:0;vertical-align:bottom;
          transition:max-width 0.35s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.2s ease;
        }
        .work-card:hover .work-card-step{max-width:60px;opacity:1}
        .work-card-inner{position:relative;border-radius:20px;overflow:hidden;cursor:pointer}
        @media(min-width:768px){.work-card-inner{border-radius:28px}}
        .work-card-inner::after{
          content:'';position:absolute;inset:0;border-radius:inherit;
          border:2px solid transparent;transition:border-color 0.3s ease;pointer-events:none;
        }
        .work-card:hover .work-card-inner::after{border-color:var(--color-brand)}
        .work-nav-btn{
          width:48px;height:48px;border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);
          display:flex;align-items:center;justify-content:center;cursor:pointer;
          transition:background 0.25s ease,border-color 0.25s ease,transform 0.2s ease,opacity 0.25s ease;
          backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
        }
        .work-nav-btn:hover:not(:disabled){background:var(--color-brand);border-color:var(--color-brand);transform:scale(1.08)}
        .work-nav-btn:active:not(:disabled){transform:scale(0.96)}
        .work-nav-btn:disabled{opacity:0.25;cursor:default}
        .work-nav-btn svg{transition:stroke 0.25s ease}
        .work-nav-btn:hover:not(:disabled) svg{stroke:white}
      `}</style>

      <section id="process" className='w-full bg-secondary rounded-0 md:rounded-[104px] mt-[clamp(80px,12vw,350px)]'>
        <div className='flex justify-between items-start'>
          <h2 className='font-bebas font-medium text-[clamp(42px,8vw,80px)] pl-10 md:pl-20 pt-16 md:pt-24'>
            How I Work <span className='text-brand'>?</span>
          </h2>
          <div className='w-[40%] h-[204px] border-l-41 border-b-41 border-brand rounded-bl-[104px] hidden md:block'/>
        </div>

        <div className='relative'>
          <div
            ref={trackRef}
            className='flex gap-4 md:gap-6 overflow-x-auto py-10 md:py-20 pl-6 md:pl-14 lg:pl-20 pr-6 md:pr-10 scrollbar-hide cursor-grab select-none'
            onMouseDown={onMouseDown} onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}    onMouseMove={onMouseMove}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          >
            {workCard.map((card, index) => (
              <div key={index}
                className='work-card flex-none flex flex-col gap-3 md:gap-4 w-[280px] sm:w-[360px] md:w-[480px] lg:w-[616px]'>
                <div
                  className='work-card-inner h-[220px] sm:h-[300px] md:h-[400px] lg:h-[542px]'
                  onClick={() => handleCardClick(card, index)}
                >
                  <img src={card.image} alt={card.name}
                    className='work-card-img w-full h-full object-cover' draggable={false}/>
                  <div className='work-card-overlay absolute inset-0'/>
                  <div
                    className='work-card-pill absolute bottom-4 right-4 md:bottom-5 md:right-5 flex items-center gap-2 md:gap-2.5 bg-white text-[11px] md:text-[13px] font-semibold tracking-wide px-3 md:px-5 py-2 md:py-3 rounded-full'
                    style={{ color:'var(--color-brand)' }}
                  >
                    VIEW MORE
                    <span className='flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full'
                      style={{ background:'var(--color-brand)' }}>
                      <svg className='w-2.5 h-2.5 md:w-3 md:h-3' viewBox='0 0 24 24' fill='none'
                        stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M5 12h14M12 5l7 7-7 7'/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className='pl-1'>
                  <h3 className='text-[16px] sm:text-[18px] md:text-[30px] lg:text-[40px] font-semibold leading-snug flex items-center'>
                    <span className='work-card-step mr-1.5'>{index+1}:</span>
                    <span className='work-card-name text-text-primary'>{card.name}</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className='flex gap-3 pl-6 md:pl-14 lg:pl-20 pb-10 md:pb-14'>
            <button aria-label='Previous' disabled={!canPrev} className='work-nav-btn' onClick={() => slideBy(-1)}>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='white' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M19 12H5M12 19l-7-7 7-7'/>
              </svg>
            </button>
            <button aria-label='Next' disabled={!canNext} className='work-nav-btn' onClick={() => slideBy(1)}>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='white' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M5 12h14M12 5l7 7-7 7'/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {openCard && (
        <Modal card={openCard.card} index={openCard.index} onClose={() => setOpenCard(null)}/>
      )}
    </>
  )
}

export default Work