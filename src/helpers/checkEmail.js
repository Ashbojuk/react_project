export default function checkEmailAddres(email) {
    let text = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return text.test(email);
}

const apiUrl = process.env.REACT_APP_API_URL;

export function contactFormRequest(data) {
    return request(data);
}

function request(data) {
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    };

    let url=`${apiUrl}/form`
    return fetch(url, config)
        .then((response) => response.json())
        .then((result) => {
            if (result.error) {
                throw result.error;
            }
            return result;
        });
    } 