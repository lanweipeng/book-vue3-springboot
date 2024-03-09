export function addQuery(url,query){
  let newUrl=url;
  Object.keys(query).forEach(key=>{
    if(query[key]){
      if(newUrl.includes('?')){
        newUrl+=`&${key}=${query[key]}`
      }else{
        newUrl+=`?${key}=${query[key]}`
      }
    }
  })
  return newUrl
}