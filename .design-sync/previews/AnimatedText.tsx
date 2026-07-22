import { AnimatedText } from '@n3wth/ui'

const stack = { display: 'flex', flexDirection: 'column' as const, gap: 16 }

export function Default() {
  return (
    <AnimatedText as="p" animation="fade-up">
      Design once, ship everywhere — text that eases into view as you scroll.
    </AnimatedText>
  )
}

export function AnimationVariants() {
  return (
    <div style={stack}>
      <AnimatedText as="p" animation="fade-up" animateOnScroll={false}>
        fade-up: rises into place
      </AnimatedText>
      <AnimatedText as="p" animation="fade-in" animateOnScroll={false}>
        fade-in: simple opacity reveal
      </AnimatedText>
      <AnimatedText as="p" animation="slide-up" animateOnScroll={false}>
        slide-up: enters from below the fold
      </AnimatedText>
      <AnimatedText as="p" animation="blur-in" animateOnScroll={false}>
        blur-in: sharpens as it appears
      </AnimatedText>
    </div>
  )
}

export function Heading() {
  return (
    <AnimatedText as="h2" animation="fade-up" delay={100} duration={500}>
      A heading that reveals itself
    </AnimatedText>
  )
}
