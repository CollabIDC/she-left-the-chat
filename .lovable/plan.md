I found the problem: the words **“She Actually Did It”** are baked directly into the hero image file used by the ribs story (`/posts/ribs-sandwich-hero-v2.png`). That is why removing HTML eyebrow text did not fix what you’re seeing.

Plan:
1. Create a cleaned replacement version of the ribs hero image with the top text removed from the image itself.
2. Save it over the existing public image path so the ribs post continues using the same image reference and no page structure changes are needed.
3. Verify the ribs post file and image no longer contain/show the “She Actually Did It” label.

Scope: only the ribs and Christmas Eve story hero image will change. No Stories page cards, titles, dates, body copy, navigation, or other pages will be changed.