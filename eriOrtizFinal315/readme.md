1. Create an app in the Firebase console on the web.

2. Enable Firestore as the database. Make sure you check start mode. Also, enable Google Auth in the authentication link on the left-hand side.

3. Load Firebase CLI Tools:

<pre><code>npm -g install firebase-tools --force</code></pre>

4. Verify:
<pre><code>firebase --version</code></pre>

5. Login and authorize Firebase:

<pre><code>firebase login</code></pre>

6. Create project then run:

<pre><code>firebase init</code></pre>

<!--




 -->

7. Setup for local hosting:

<pre><code>firebase serve --only hosting</code></pre>

10. If you are using sass make sure you have your package.json path for sass changed to public/sass

11. Deploy to Firebase:

<pre><code>firebase deploy --except functions</code></pre>
