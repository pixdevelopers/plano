import express from 'express';
const router = express.Router();
import { Ads ,validate } from '../models/ads';
router.get('/', async (req, res, next) => {
    const result = await Ads.find();
    res.send(result);
});
router.get('/:id', async (req, res, next) => {
    const result = await Ads.findById(req.params.id);
    if (!result) return res
                   .status(404)
                   .send(
                     'The Ads with the given ID was not found.'
                   );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);
    
    const { title, adsURL, size, duration, pageLocation, linkToRedirect, description } = req.body.params;

    let ads = new Ads({ title, adsURL, size, duration, pageLocation, linkToRedirect, description, client:req.body._id});

    ads = await ads.save();

    res.send(ads);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, adsURL, size, duration, pageLocation, linkToRedirect, description } = req.body.params;
    const updatedAt = Date.now;
    const ads = await Ads.findByIdAndUpdate(req.params.id, 
        { title, adsURL, size, duration, pageLocation, linkToRedirect, isExpired, description, updatedAt }, { new: true });

    if (!ads) return res.status(404).send('The ads with the given ID was not found.');

    res.send(ads);
});

router.delete('/:id', async (req, res,next) => {
    const ads = await Ads.findByIdAndRemove(req.params.id);
    if (!ads) return res.status(404).send('The ads with the given ID was not found.');
    res.send(ads);
});


export default router;
