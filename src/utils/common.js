import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const writeCookies = (data) => {
    let cook = 'c1';

    if (!data && !cookies.get('c1')) {
        data = JSON.stringify({
            mine: {
                owned: [
            
                ],
                total: 0
            }
        });
    }

    if (data) cookies.set(cook, data, { path: '/' });

    // let i = 0;
    // let tmp = Array(10);
    // for (let s of data) {
    //     let cook = 'c'+((i+1)%10).toString();
    //     if (i/10 < 1) cookies.set(cook, '', { path: '/' });
    //     cookies.set(cook, cookies.get(cook) + s, { path: '/' });
    //     console.log(s + ' | ' + cook);
    //     i += 1;
    // }
    // for (let i=0; i<10; i++) console.log('c'+(i+1).toString()+': ' + cookies.get('c'+(i+1).toString()));

}

export const resetCookies = () => {
    for (let i=0; i<100; i++) {
        cookies.remove('c'+(i+1).toString());
    };
    writeCookies();
}

export const readCookies = () => {
    let cook = cookies.get('c1');
    return cook;
}