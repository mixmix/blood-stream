# blood-stream

Some prototype fintec modelled on the human body.

State is tracked in organs and in blood.
The heart pumps the blood state through the organs, which reduce their [internal] state and the blood state in a range of specialised ways.

```js
pull(
  heart.source,
  Pacemaker(200),
  foodTube.organ({ monitor }),
  Marrow(),
  Pancreas(),
  Liver({}),
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)
```

In this demo, the pancreas and adipose tissue (fat), collaborate using blood-mediated hormone signalling ([glucagon](https://en.wikipedia.org/wiki/Glucagon) + [insulin]()) to modulate the blood-sugar level.
The organism can eat, and is is continuosly burning sugar (in this case, the marrow is paying ongoing upkeep).

The monitor is some intubation added to some organs allowing tracking of internal state, as well as stimulating the organ with input (e.g. feeding it)

![](demo.png)


## install

```bash
git clone REPO_ADDRESS blood-stream
cd blood-stream
npm install
npm start
```

keys in simulation : 

- `1-9` : drop 10-90 sugar in the digestive tract (foodTube)
- `q` : quit

If your blood suger hits 0, your organism dies.


## motivation

mix and alanna are merging their finances.
mix was charged with designing the account layout and money flow.
was frustrated by the limitations of current bankings' auto-payments.
this is an exploration of money flows from a self-regulating, bottom-up approach.

