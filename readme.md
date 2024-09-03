(this is an assignment for Harvard's CS50 Web Development Program)

## Introduction

Welcome to the Mail application! This powerful email management tool offers a range of key features to enhance your email experience. With Mail, you can easily view and navigate through your emails, mark them as read or unread, and even reply to messages with just a few clicks. Additionally, you have the ability to archive and unarchive emails, keeping your inbox organized and clutter-free. Whether you're a busy professional or a casual user, Mail is designed to streamline your email workflow and make communication effortless. Start using Mail today and take control of your inbox like never before!

## Next in line

### Viewing email
- View Email: When a user clicks on an email, the user should be taken to a view where they see the content of that email. You’ll likely want to make a GET request to /emails/<email_id> to request the email.  Your application should show the email’s sender, recipients, subject, timestamp, and body.  You’ll likely want to add an additional div to inbox.html (in addition to emails-view and compose-view) for displaying the email. Be sure to update your code to hide and show the right views when navigation options are clicked.
### Read/unread
- If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.
- Once the email has been clicked on, you should mark the email as read. Recall that you can send a PUT request to /emails/<email_id> to update whether an email is read or not.

## Replys
- Reply: Allow users to reply to an email.
    - When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email. - When the user clicks the “Reply” button, they should be taken to the email composition form. 
    - Pre-fill the composition form with the recipient field set to whoever sent the original email.
    - Pre-fill the subject line. If the original email had a subject line of foo, the new subject line should be Re: foo. (If the subject line already begins with Re: , no need to add it again.)
    - Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.

    ## Implemented:
- You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body. Once the email has been sent, load the user’s sent mailbox.
- Mailbox: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
- Each email should then be rendered in its own box (e.g. as a <div> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.
- Archive and Unarchive: Allow users to archive and unarchive emails that they have received.
- When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.