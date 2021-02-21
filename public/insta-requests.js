const top_search_url = "https://www.instagram.com/web/search/topsearch?";
const graphql_search_url = "https://www.instagram.com/graphql/query?";


function followers_request(user_id, user_name, variables, callback){
    let params = {
        "query_hash": "c76146de99bb02f6415203be841dd25a",
        "variables": variables
    };
    let path_params = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');

    let url = graphql_search_url+path_params;

    return fetch(url)
    .then(data => data.json())
    .then(json => callback(user_id,user_name,json.data));    
    
}

function user_search(user_name,callback) {
    let params = {
        "context": "blended",
        "query": user_name
    };
  
    let path_params = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    let url = top_search_url+path_params;

    fetch(url)
    .then(data => data.json())
    .then(callback);
}
