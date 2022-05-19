const express = require('express');
const { json } = require('express/lib/response');
const fs = require('fs');
const app = require('../app');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'));

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            message: "fail",
            body: "no body given in the terminal"
        })
    }
    next();
}

exports.checkId = (req, res, next, val) => {
    console.log(`the param id is: ${val}`)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            message: "fail",
        })
    }
    next();

}
exports.getTours = (req, res) => {
    res.status(200).json({
        message: "success",
        data: {
            tours
        }
    })
}
exports.createTours = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            message: "success",
            data: {
                newTour

            }
        })
    })

}

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        message: "success",
        data: {
            tour
        }
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        message: "success",
        data: "data has been updated...."


    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        message: "success",
        data: null


    })
}