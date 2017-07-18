import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
// Enable Blob and XMLHttpRequest polyfills
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
class WilloFetchBlob {
    imageName(imageKey) {
        return `${imageKey}-${Platform.OS}-${new Date()}.png`;
    }
    getPhotoURL(firebase, directory, imageKey) {
        return firebase
            .storage()
            .ref(`images/${directory}/${imageKey}`)
            .getDownloadURL();
    }
    uploadImage(firebase, directory, imageKey, uri) {
        let rnfbURI = RNFetchBlob.wrap(uri);
        const imageName = this.imageName(imageKey);
        // Create blob from file path
        return new Promise((resolve, reject) => {
            Blob
                .build(rnfbURI, { type: 'image/png;' })
                .then(blob => {
                // Upload image using Firebase SDK
                firebase.storage()
                    .ref(`images/${directory}`)
                    .child(imageKey)
                    .put(blob, { contentType: 'image/png' })
                    .then(snapshot => {
                    blob.close();
                    resolve();
                }).catch(error => {
                    reject(`${imageName} failed to upload to firebase uri ${uri} with error: ${error}`);
                });
            }).catch(error => {
                reject(`Blob failed to build ${imageName} with error: ${error}`);
            });
        });
    }
}
const willoFetchBlob = new WilloFetchBlob();
export default willoFetchBlob;
//# sourceMappingURL=willoFetchBlob.js.map