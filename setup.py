from distutils.core import setup

with open('README.txt') as file:
    long_description = file.read()

setup(
    name = 'labMTsimple',
    packages = ['labMTsimple'],
    package_data={'labMTsimple': ['data/labMT/*.txt','data/PANAS-X/*.txt','data/warriner/*.csv','data/ANEW/all*.csv','data/MPQA-lexicon/subjectivity_clues_hltemnlp05/*.tff','data/liu-lexicon/*-clean.txt','static/*.js','static/hedotools.shift.css']},
    version = '2.8.4',
    description = 'Basic usage script for dictionary-based sentiment analysis. Intended use with labMT data',
    long_description = long_description,
    author = 'Andy Reagan',
    author_email = 'andy@andyreagan.com',
    url = 'https://github.com/andyreagan/labMT-simple', 
    download_url = 'https://github.com/andyreagan/labMT-simple/tarball/2.8.4',
    keywords = [],
    classifiers = ['Development Status :: 4 - Beta',
                   'Programming Language :: Python'],
    )





