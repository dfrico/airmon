export function loadContent(callback) {

    let url = "http://localhost:8080/";

    return fetch(url)
        .then(response => {
            console.log(response);
            if(response.ok){
                return response;
            }
            else return "";
        }).catch(status => {
            if(status == 401) {
                console.log('oops');
            }
            else console.error(`Request error (${status}) not managed.`);
        });
}

export default loadContent;