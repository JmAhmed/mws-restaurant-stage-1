/* Register service worker */

// check if the browser supports service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
        console.log('Registration Complete');
    }).catch(()=> {
        console.log('Registration Failed');
    })

} else {
    console.log('not supported');
}