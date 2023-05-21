# MMM-WhisperGPT-Extra

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This just extends [MMM-WhisperGPT]() module - serving just as a tiny example how one might make custom reactions to various requests.

## Using the module

There are no configs - this module is just a template / inspiration on how one might extend the default functionality.
```js
var config = {
    modules: [
        {
            module: 'MMM-WhisperGPT-Extra'        
        }
    ]
}
```

## Events you might use.

| Option                               | Description
|-----------------                     |-----------
| `WHISPERGPT_KEYWORD_DETECTED`        | When a keyword is detected (i.e. JARVIS).
| `WHISPERGPT_COMMAND`                 | When we want to react to a custom command. 
