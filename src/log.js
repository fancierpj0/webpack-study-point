export default function(...args){
  if(process.env.NODE_ENV === 'development'){
    console.log.apply(console, args);
  }
}
