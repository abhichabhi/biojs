# Date #
2012-06-20

# Attendees #
We had some people at the EBI interested to learn more about BioJS, so we decided to organize a mini-workshop to show people how to use/develop BioJS components and get some feedback to improve the library. At the end we got 2 people from TGCA, 5 from the Sanger institute and 28 people from EBI.

  * Anil Thanki - TGCA
  * Xingdong Bian - TGCA
  * Eugene Bragin - Sanger
  * Dushyanth Jyothi - Sanger
  * Fabian Schreiber - Sanger
  * Frank Schwach - Sanger
  * Nick - Sanger
  * Leyla J Garcia- EBI
  * John Gomez- EBI
  * Rafael C Jimenez - EBI
  * Shaun - EBI
  * Antonio Fabregat - EBI
  * Mihai Glonț - EBI
  * Stathis Kanterakis - EBI
  * John May - EBI
  * Laurent Gil - EBI
  * Venkatesh Muthukrishnan - EBI
  * Swanand - EBI
  * Francis Rowland - EBI
  * Joseph Rossetto - EBI
  * Alan Da Silva - EBI
  * Mahmut Uludag - EBI
  * Peter Walter - EBI
  * Marine - EBI
  * Noemi del Toro - EBI
  * Rui Wang - EBI
  * Samuel Croset - EBI
  * Rodrigo Ochoa - EBI
  * Nicolas Rodriguez - EBI
  * Glen van Ginkel - EBI
  * Jonathan warren - EBI
  * Robert Petryszak - EBI
  * Vladimir Volynkin - EBI
  * Eduardo - EBI
  * Florian Reisinger - EBI

# Agenda #
  * 10:00 - 10:30, Introduction to the BioJS project
  * 10:30 - 11:00, How to use BioJS components and the registry
  * 11:00 - 12:00, Tutorial of how to develop a BioJS component
  * 12:00 - 13:00, Lunch break
  * 13:00 - 13:30, Brainstorming and short presentations of ideas
  * 13:30 - 17:00, Helping you to develop a BioJS component

# Presentation #
  * [Francis' sketchnote summarizing the BioJS presentation](http://www.flickr.com/photos/francisrowland/7407095724/sizes/o/in/set-72157630205678288/)
  * Introduction to the BioJS project
    * [PDF](http://www.ebi.ac.uk/~rafael/talks/2012-06-10_biojs_workshop/biojs_rjimenez.pdf)
    * [PPTX](http://www.ebi.ac.uk/~rafael/talks/2012-06-10_biojs_workshop/biojs_rjimenez.pptx)
  * [Examples and list of links presented in the live demo](http://www.ebi.ac.uk/~rafael/talks/2012-06-10_biojs_workshop/BiojsLinks.html)

# Feedback #
  * To have a registry where people can show their interest to use or develop a component
  * To allow feedback and comments for components in the registry page
  * Check how to include unit testing for components
  * Add a FAQ secction. One general about BIoJS and other one per component
  * If available a component in the resgistry should hava a link to the requirements


# Component ideas #
Component ideas proposed to develop during or just after the workshop:

## Plasmid representation ##
  * Represent plasmid annotations in a circular and linear way using an abstract representation.
  * Proposed by Frank Schwach
  * http://plasmogem.sanger.ac.uk/

## Genome browser component ##
  * Create a component to representation of genome information using the latest development of the ENSEMBl canvas viewer.
  * Proposed by Eugene Bragin

## Periodic table ##
  * A table of the chemical elements as a exercise to learn how to develop a BioJS
  * Proposed by Glen van Ginkel
  * http://www.ptable.com/

## Ontology visualization ##
  * Graph view of ontology terms.
  * Proposed by Venkatesh Muthukrishnan
  * http://www.ebi.ac.uk/chebi/chebiOntology.do?chebiId=CHEBI:35135

## Tissue expression images ##
  * A component to visualize tissue expression images
  * Proposed by Jonathan warren

## Features for 3D structures ##
  * Display UniProt coverage, all the PDB acceccion for a UniProt accession.
  * Proposed by Swanard
  * http://www.ebi.ac.uk/pdbe-apps/widgets/unipdb?uniprot=P60493

## 3D structure image slideshow ##
  * A component to visualize protein structure images for one PDB acc
  * Proposed by Swanard
  * http://www.ebi.ac.uk/pdbe-srv/view/entry/3sip/summary


## PDBe legend image ##
  * Legend to describe information available for one specific PDB accession
  * Proposed by Swanard
  * http://www.ebi.ac.uk/pdbe-srv/view/entry/3sip/summary

## Display PDB structures for UniProt accession ##
  * Improve to current Protein3DUniprot component to collect information from the PDBe webservide instead of the DAS alignment server. Sort structures by confidence score suing the new service of PDBe.
  * Developed by John. Swanard willing to accept this feature request.
  * http://www.ebi.ac.uk/~jgomez/biojs/registry/Biojs.Protein3DUniprot.html

## ChEMBL component with hig resolution images ##
  * Modify or extend the ChEMBL component to include high resolution images like the ChEBI component.
  * Developed by John. Shaun willing to accept this feature request.
  * http://www.ebi.ac.uk/~jgomez/biojs/registry/Biojs.ChEMBLCompound.html

## Improve interaction table ##
  * This table is taking as input molecular interactions in PSI-MITAB, however it is not parsing well.
  * Developed by John. Rafael willing to accept this feature request.
  * http://www.ebi.ac.uk/~jgomez/biojs/registry/Biojs.InteractionsTable.html

## Interaction table integrating intereaction from several PSICQUIC resources ##
  * Component extending the interaction table to query several PSIQUIC services with a MIQL query.
  * Proposed by Marine
  * http://www.ebi.ac.uk/~jgomez/biojs/registry/Biojs.InteractionsTable.html

## Phylogenetic trees ##
  * Create a BioJS component for phylogenetic trees based on the TreeFam project
  * Proposed by Fabian Schreiber

## Phylogenetic trees ##
  * Create a BioJS component for phylogenetic trees based on Ian Sillitoe's project
  * Proposed by Ian Sillitoe (UCL)

## Sequence alignments ##
  * Create a BioJS component for sequence alignments based on the TreeFam project
  * Proposed by Fabian Schreiber

## Sequence alignments ##
  * Create a BioJS component for sequence alignments based on Ian Sillitoe's project
  * Proposed by Ian Sillitoe (UCL)

## Structural viewer ##
  * Create a BioJS component for structural views based on Ian Sillitoe's project
  * Proposed by Ian Sillitoe (UCL)