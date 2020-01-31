# Purpose:
We want you to create a React component that can render different forms, e.g. sign up, mailing list registration, feedback form. Given the proposed variety to support, we want to create a single component that can be easily adapted.

# Details:
Create a React component that can accept a JSON-based form definition via a prop and produce a form that, in this case, can be used to collect a person’s details. The form should include the following fields:

```
name
    text based
    should enforce the need for a first and last name (separated by a space)
date of birth
    date based
    required, should be older than 18
gender
    options based (male/female)
    optional
contact number
    text based
    optional
    allow for multiple values (e.g. mobile, home, etc)
require guardian consent
    checkbox
    optional
guardian details (name, contact)
    text based
    required/applicable if consent checkbox is ticked

```

The form should provide the resulting form data on successful submission. A valid output for the form might be the following:
```js
a = {
    name: "John Foo",
    dob: "1990-01-01",
    gender: 1,
    contact: [{
        type: "mobile",
        value: "0400123123"
    },{
        type: "home",
        value: "610000000"
    }],
    guardian: {
        name: "Jane Foo",
        contact: "0400123123"
    }
}

```

The form should be generated at runtime based on a JSON schema that you devise. 
Changing the schema should alter what fields are shown and what data is returned on submit.

Please ensure the code is original - please don't not use an existing form library.

We expect you to spend 1 - 2 hours on the task, 
although you’re welcome to spend longer if interested. 
The size of the task is ambitious so we don't expect you to finish. 
We are looking at how you approach the problem.

Please treat the task as if you were producing code ultimately for release. 
Please use Git and make a commit at the start (i.e. blank repo) and after an hour. 
In your closing commit please mention the total amount of time you spend on the task.

If you have any questions about the problem, please feel free to ask me. 
Once finished, please send the repo through to me.
