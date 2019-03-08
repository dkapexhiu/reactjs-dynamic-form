# ReactJS dynamic form
Make a dynamic form input where all the inputs rendered based on a JSON config
(Example below). The JSON config should be fetched with AJAX from API
endpoint (Make a static endpoint to get data in JSON format). You can add more filds to
JSON based on the example structure. All inputs should be validated based on config
before submitting to the server. If validation is not passed show errors message below
the input. Supported input type are: number, select, text, textarea. For input type select
you should use the options provided in config. All inputs should be saved local state.
After form is completed and validated all the date should sent with a post request to an
API endpoint (Make a static post endpoint). You dont have to handle or validate data in
backend, just accept request and return status code 200; When the post request is not
finished the form has a loading state (button is not clickable and inputs can not be
changed during request). After post request is finished user should be able to show a
success message or error message based on server response.

![alt text](https://github.com/dkapexhiu/reactjs-dynamic-form/blob/master/dynamic-form.jpg)

## Example json file:

![alt text](https://github.com/dkapexhiu/reactjs-dynamic-form/blob/master/json.jpg)
