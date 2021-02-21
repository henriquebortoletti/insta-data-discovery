var csv_data = [];
var iteractions = 0;

function followers_download(user_id,user_name,data) {
    let followed_by = data.user.edge_followed_by;
    for(i=0; i< followed_by.edges.length;i++){
        let user = followed_by.edges[i].node;
        csv_data.push(
            [user.full_name, 
            user.username, 
            user.is_private === true ? "sim":"não", 
            user.is_verified=== true ? "sim":"não"]
        );
    }
    iteractions+=50;
    if(followed_by.page_info.has_next_page && iteractions <2000){
        let variables = JSON.stringify({
            "id": user_id,
            "include_reel": false,
            "fetch_mutual": false,
            "first": 50,
            "after": followed_by.page_info.end_cursor
        });
        return followers_request(user_id,user_name,variables,followers_download);
    }
    csv_data =csv_data.join("\n");
    var blob = new Blob([csv_data],{type: 'text/csv;charset=utf-8;'});
    var url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download',user_name+'.csv');
    csv_download.onclick = function() {
        link.click()
    }
}

// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
function csv_headers() {
    csv_data =[];
    iteractions=0;
    csv_data.push(["Nome completo","Username", "Conta privada", "Conta verificada"]);
}
