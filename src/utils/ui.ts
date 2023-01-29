interface Prevent {
  preventDefault: () => void
}

interface StopPropagation {
  stopPropagation: () => void
}

export const preventDefault = <Event extends Prevent>(
  fn?: (event: Event) => void
) => {
  return (event: Event) => {
    event.preventDefault()
    fn && fn(event)
  }
}

export const stopPropagation = <Event extends StopPropagation>(
  fn?: (event: Event) => void
) => {
  return (event: Event) => {
    event.stopPropagation()
    fn && fn(event)
  }
}
