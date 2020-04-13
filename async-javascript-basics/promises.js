const posts = [
  { title: 'Post one', body: 'This is first post'},
  { title: 'Post two', body: 'This is second post'}
];

function getPosts() {

  setTimeout(() => {
    let output = '';
    posts.forEach((post) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;

      if(!error) {
        resolve();
      } else {
        reject('Error');
      }

    }, 2000);
  });
}

// createPost({title: 'Post three', body: 'This is third post'})
//   .then(getPosts)
//   .catch((err) => console.error(err))


async function init() {
  await createPost({title: 'Post three', body: 'This is third post'});
  getPosts();
}

init();

// const promise1 = Promise.resolve('Saluton');
// const promise2 = 666;
// const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Gis la revidon'));

// Promise.all([promise1, promise2, promise3])
//   .then((values) => console.log(values));
