export const showModal = ( init = true ) => {
  init ? document.body.classList.add( 'no-scroll' ) : document.body.classList.remove( 'no-scroll' )
}