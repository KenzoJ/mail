document.addEventListener('DOMContentLoaded', function() {
    

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => mail_inbox_view());
    document.querySelector('#sent').addEventListener('click', () => sent_email_view());
    document.querySelector('#archived').addEventListener('click', archive_inbox_view);
    document.querySelector('#compose').addEventListener('click', compose_email);
  
    // By default, load the inbox
    mail_inbox_view();
  });


// create an email
function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#sent-email-view').style.display = 'none';
  
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

// Show the archived mailbox and hide other views
function archive_inbox_view() {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-email-view').style.display = 'block';
    document.querySelector('#sent-email-view').innerHTML = `<h3>Archived!</h3>`;

    fetch('/emails/archive')
    .then(response => response.json())
    .then(emails => {
        // Check if the emails array is not empty
        if (emails.length > 0) {
            const emailContainer = document.createElement('div');
            emailContainer.className = 'email-container';

            // Loop through each email and create HTML elements for them
            emails.forEach(email => {
                const emailDiv = document.createElement('div');
                emailDiv.className = 'email';

                //Creates div for Recipient, subject, body
                const recipients = document.createElement('p');
                recipients.textContent = `To: ${email.recipients}`;
                const subject = document.createElement('h4');
                subject.textContent = email.subject;
                const body = document.createElement('p');
                body.textContent = email.body;
                const timestamp = document.createElement('p');
                timestamp.textContent = `Sent at: ${email.timestamp}`;
                
                //button to unarchive
                const unarchiveButton = document.createElement('button');
                unarchiveButton.textContent = 'unarchive';
                unarchiveButton.addEventListener('click', () => unarchiveEmail(email.id));
               
                // the order of containers for the div
                emailDiv.appendChild(timestamp);
                emailDiv.appendChild(recipients);
                emailDiv.appendChild(subject);
                emailDiv.appendChild(body);
                emailDiv.appendChild(unarchiveButton)
                emailContainer.appendChild(emailDiv);
            });

            // Add a class to the email container
            emailContainer.className = 'email-container';

            // Append the email container to the sent-email-view div
            document.querySelector('#sent-email-view').appendChild(emailContainer);
        } else {
            // If no emails, display a message
            document.querySelector('#sent-email-view').innerHTML += '<p>No emails archived.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching sent emails:', error);
        document.querySelector('#sent-email-view').innerHTML += '<p>Error fetching sent emails.</p>';
    });

}

// making sure page is loaded before sending form
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#compose-form').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('button clicked');
        send_mail();
    });
});

// creates POST request to push mail to server
// NEEDS client side checks
function send_mail() {
    console.log('send_mail function called');
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: recipients,
            subject: subject,
            body: body
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        mail_inbox_view();
    });

}

// VIEW: All sent emails
function sent_email_view() {
    console.log('viewing sent emails...');
   
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-email-view').style.display = 'block';

    document.querySelector('#sent-email-view').innerHTML = `<h3>Sent mailbox</h3>`;


    fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
        // Check if the emails array is not empty
        if (emails.length > 0) {
            const emailContainer = document.createElement('div');
            emailContainer.className = 'email-container';

            // Loop through each email and create HTML elements for them
            emails.forEach(email => {
                const emailDiv = document.createElement('div');
                emailDiv.className = 'email';

                const recipients = document.createElement('p');
                recipients.textContent = `To: ${email.recipients}`;

                const subject = document.createElement('h4');
                subject.textContent = email.subject;

                const body = document.createElement('p');
                body.textContent = email.body;

                const timestamp = document.createElement('p');
                timestamp.textContent = `Sent at: ${email.timestamp}`;

                emailDiv.appendChild(timestamp);
                emailDiv.appendChild(recipients);
                emailDiv.appendChild(subject);
                emailDiv.appendChild(body);
                emailContainer.appendChild(emailDiv);
            });

            // Add a class to the email container
            emailContainer.className = 'email-container';

            // Append the email container to the sent-email-view div
            document.querySelector('#sent-email-view').appendChild(emailContainer);
        } else {
            // If no emails, display a message
            document.querySelector('#sent-email-view').innerHTML += '<p>No sent emails found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching sent emails:', error);
        document.querySelector('#sent-email-view').innerHTML += '<p>Error fetching sent emails.</p>';
    });
}

// VIEW: All mail sent to person (not archived)
function mail_inbox_view() {
    console.log('viewing inbox...!');
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-email-view').style.display = 'none';

    document.querySelector('#emails-view').innerHTML = `<h3>Inbox!</h3>`;

    fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
        // Filter out archived emails
        const filteredEmails = emails.filter(email => !email.archived);

        // Check if the filtered emails array is not empty
        if (filteredEmails.length > 0) {
            const emailContainer = document.createElement('div');
            emailContainer.className = 'email-container';

            // Loop through each email and create HTML elements for them
            filteredEmails.forEach(email => {
                const emailDiv = document.createElement('div');
                emailDiv.className = 'email';

                const sender = document.createElement('p');
                sender.textContent = `From: ${email.sender}`;

                const subject = document.createElement('h4');
                subject.textContent = email.subject;

                const body = document.createElement('p');
                body.textContent = email.body;

                const timestamp = document.createElement('p');
                timestamp.textContent = `Received at: ${email.timestamp}`;

                const archiveButton = document.createElement('button');
                archiveButton.textContent = 'Archive';
                archiveButton.addEventListener('click', () => archiveEmail(email.id));

                
                // from person, subject, timestamp
                emailDiv.appendChild(sender);
                emailDiv.appendChild(subject);
                emailDiv.appendChild(timestamp);
                // archive button
                emailDiv.appendChild(archiveButton);
                emailContainer.appendChild(emailDiv);
            });

            // Add a class to the email container
            emailContainer.className = 'email-container';

            // Append the email container to the emails-view div
            document.querySelector('#emails-view').appendChild(emailContainer);
        } else {
            // If no emails, display a message
            document.querySelector('#emails-view').innerHTML += '<p>No emails found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching emails:', error);
        document.querySelector('#emails-view').innerHTML += '<p>Error fetching emails.</p>';
    });
}

// Utility: mark email as archived
function archiveEmail(emailId) {
    console.log(`Archiving email with ID: ${emailId}`);

    fetch(`/emails/${emailId}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // Reload the mailbox after archiving the email
    })
    .catch(error => {
        console.error('Error archiving email:', error);
    });
    window.location.reload(); // This will reload the current page
}

// Utility: mark email as unarchived

function unarchiveEmail(emailId) {
    fetch(`/emails/${emailId}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: false
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // Reload the mailbox after archiving the email
    })
    .catch(error => {
        console.error('Error archiving email:', error);
    });
    window.location.reload(); // This will reload the current page
}