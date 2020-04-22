import axios from 'axios'
export default function ajax(url = '', data = {}, type = 'GET') {
    if (type === 'get') {
        return axios({
            method: "get",
            url,
            data
        });
    }
    else {
        return axios({
            method: "post",
            url: url,
            data: data,
            transformRequest: [
                function (data) {
                    let ret = "";
                    for (let it in data) {
                        ret +=
                            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                    }
                    return ret;
                }
            ],
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}
