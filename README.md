# atomicly
Atomic firebase reads made simple

Tired of wading through the rivers of callback hell to dodge big pieces of data in firebase?

Lets say you have an app that sorts firepads and you have a list view of your firepads

    /pads/<padId>/
    {
      'title' : 'my pad',
      'creator' : 'David Helgeson',
      'editors' : {
        'Ron Swanson',
        'David Helgeson',
        'Joe Shmoe'
      },
      'checkpoints': { big object! },
      'history': { big object! }
    }

if you're only displaying the title, creator and editors properties in a view this could be a very expensive read.


To get around this you could enter callback hell like so:

    ref.child('title').once('value',function(snap){
      // handle data
      ref.child('creator').once('value', function(snap2){
        // handle more data
        ref.child('editors').once('value', function(snap3){
          // handle even more data
          // you deserve better
        });
      });
    });
    
So there's this instead:

    atomicly(ref,['title', 'editors', 'creator']).then(
      function(value){
        // value === 
        // {
        //   'title' : 'my pad',
        //   'creator' : 'David Helgeson',
        //   'editors' : {
        //    'Ron Swanson',
        //    'David Helgeson',
        //    'Joe Shmoe'
        //   }
        // }
      },
      });
    
