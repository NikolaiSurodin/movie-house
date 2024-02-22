export const scrollTo = ( params = {} ) => {
  window.scrollTo( {
    top: params.top || 0,
    left: params.left || 0,
    behavior: 'smooth'
  } )
}