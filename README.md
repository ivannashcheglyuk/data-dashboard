# Web Development Project 5 - *Data Dashboard*

Submitted by: **Ivanna Shcheglyuk**

This web app: **Displays a dashboard of cat breeds fetched from The Cat API. It allows users to search breeds by name, filter them by origin, and view summary statistics about the dataset.**

Time spent: **9** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *Total breeds: shows the total number of cat breeds fetched.*
    - *Average lifespan: displays the average lifespan across all breeds.*
    - *Most common origin: shows which country of origin is most common among breeds.*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/ivannashcheglyuk/data-dashboard/blob/main/project5.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! --> 
GIF created with Bandicam and EZGIF.

## Notes

Describe any challenges encountered while building the app.
It was challenging to work with the API data structure and ensure it displayed correctly in the dashboard. Adding live search and filter functions together without breaking the data logic took careful planning. Styling summary statistics and conditional messages like "No breeds found" clearly on all backgrounds was also tricky. Finally, calculating and showing statistics such as average lifespan and most common origin required extra data parsing and logic.

## License

    Copyright 2025 Ivanna Shcheglyuk

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
