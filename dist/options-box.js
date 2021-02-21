const input_search = document.getElementById("input-search");
const search = document.getElementById("search");
const result = document.getElementById("result");
const download = document.getElementById("download");
const csv_download = document.getElementById("csv_download");
var option_alredy_selected=false;
input_search.addEventListener("keyup", function(event) {
    result.textContent ='';
    if(input_search.value !== '' && event.repeat === false){        
        user_search(input_search.value, function(array) {
            if(array.users.length >0){
                let limit = array.users.length > 5 ? 5:array.users.length;
                var list = document.createElement('ul');
                list.onclick = function (event) {
                    download.style.display = 'flex';
                    option_alredy_selected=true;
                };
                for (let i = 0; i < limit; i++) {
                    let item = document.createElement('li');
                    let user_data=array.users[i].user;
                    let user_id = user_data.pk;                
                    let username = user_data.username;                    
                    item.onclick = function() {
                        let variables = JSON.stringify({
                            "id": user_id,
                            "include_reel": false,
                            "fetch_mutual": false,
                            "first": 50
                        })
                        followers_request(user_id, username, variables,followers_download);
                    };
                    item.appendChild(document.createTextNode(username));
                    list.appendChild(item);
                }    
                result.textContent ='';
                if(!option_alredy_selected)result.appendChild(list); 
            }   
        });
    }

});

document.addEventListener("click",function (event) {    
    input_search.value='';
    result.textContent='';    
})

input_search.addEventListener("click",function (event) {
        download.style.display = 'none';
        option_alredy_selected=false;
        csv_headers();
        document.querySelectorAll('.button').forEach(button =>{
        if(button.classList.contains('loading')) {
            button.classList.remove('loading');
            svg.innerHTML = getPath(target_y, 0, null);
        }});
});

